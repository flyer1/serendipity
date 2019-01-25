import { Component, OnInit, ViewEncapsulation, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { BlogService } from '../services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { RoutingService } from 'src/app/core/routing/routing.service';
import { ComponentBase } from 'src/app/core/component/component-base';
import { MarkdownService } from 'src/app/core/formatter/markdown.service';
import { copyToClipboard } from 'src/app/core/helpers/common-helpers';
import { ViewportService } from 'src/app/core/browser/viewport.service';
import { DomService } from 'src/app/core/browser/dom.service';
import { NotifierService } from 'src/app/core/messaging/notifier.service';

@Component({
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent extends ComponentBase implements OnInit, AfterViewInit {

  private form: FormGroup;
  post: BlogPost;
  threshold: number;
  img: HTMLImageElement;

  @ViewChild('blogPost') blogPost: ElementRef;
  get isNew() { return this.post.id === '-1'; }

  constructor(private fb: FormBuilder, private blogService: BlogService, private route: ActivatedRoute,
    private router: RoutingService, private markdown: MarkdownService, private notifierService: NotifierService,
    private viewportService: ViewportService, private renderer: Renderer2, private domService: DomService) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(parms => this.getData(parms.id));
    this.router.navigationEnd$.pipe(takeUntil(this.destroy$)).subscribe(_ => this.onNavigationEnd());
    this.initForm();
  }

  ngAfterViewInit() {
    fromEvent(document, 'scroll')
      .pipe(debounceTime(30), takeUntil(this.destroy$))
      .subscribe(_ => this.onScroll());
  }

  onNavigationEnd() {
    // Give the data binding a chance to render the blog content before we reset.
    setTimeout(_ => this.reset(), 500);
  }

  onScroll() {
    if (!this.img) {
      // Note: We don't have access to the blog post content like we normally would. So we can't use a #localVar on the view and reference it via @ViewChild().
      this.img = this.domService.querySelector(this.blogPost.nativeElement, '.body img') as HTMLImageElement;
      if (!this.img) { return; }
    }

    const inViewport = this.viewportService.inViewport(this.img, 0.5);
    if (inViewport) {
      this.renderer.addClass(this.img, 'in-viewport');
    }
  }

  initForm() {
    this.form = this.fb.group({ content: '', formattedContent: '' });

    this.form.get('content')
      .valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(val => {
        this.post.content = val;
        this.post.formattedContent = this.markdown.compile(val);
      });
  }

  reset() {
    this.img = null;
  }

  getData(id: string) {
    if (id === '-1') {
      const todayDate = new Date();
      const today = todayDate.getFullYear() + '-' + todayDate.getMonth() + 1 + '-' + todayDate.getDate();
      this.post = new BlogPost({ id: id, title: 'New Blog Post', content: '', date: today }, this.markdown);
      return;
    }

    this.blogService.get(id).subscribe(blogPost => {
      this.post = blogPost;
    });
  }

  navigate(id: string) {
    this.router.gotoBlogPost(id);
  }

  navigateToProfile() {
    this.router.gotoAbout();
  }

  copy() {
    const content = this.post.content.replace(/\n/g, '\\n');
    copyToClipboard(content);

    this.notifierService.queueMessage('Contents have been copied to the clipboard.');
  }
}

