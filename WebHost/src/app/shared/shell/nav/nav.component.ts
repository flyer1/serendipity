import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';
import { RoutingService } from '../../../core/routing/routing.service';
import { BaseNavComponent } from './base-nav.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent extends BaseNavComponent implements OnInit {
  @ViewChild('mobileNavTrigger') mobileNavTrigger: ElementRef;

  isMobileMenuCollapsed = true;
  activeFeature: string;
  pageTitle$: Observable<string>;

  constructor(routingService: RoutingService) {
    super(routingService);
  }

  ngOnInit() {
    this.pageTitle$ = this.routingService.pageTitle$;
    this.routingService.activeFeature$.pipe(takeUntil(this.destroy$)).subscribe(activeFeature => this.activeFeature = activeFeature);
  }

  toggleMobileMenu() {
    this.toggleMobileMenuFlag();
  }

  private toggleMobileMenuFlag() {
    this.isMobileMenuCollapsed = !this.isMobileMenuCollapsed;
  }

  /**
   * A little easter egg to get into the blog post editor (nothing is persisted on the back end, this is just used to build the markdown)
   */
  editBlogPost() {
    this.routingService.gotoNewBlogPost();
  }
}


