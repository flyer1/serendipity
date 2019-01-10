import { Component, AfterViewInit, OnInit } from '@angular/core';

import { RecentPostsService } from './services/recent-posts.service';
import { BlogPostSummary } from 'src/app/features/blog/models/blog-post-summary.model';
import { RoutingService } from 'src/app/core/routing/routing.service';
import { takeUntil } from 'rxjs/operators';
import { ComponentBase } from 'src/app/core/component/component-base';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
  providers: [RecentPostsService]
})
export class RecentPostsComponent extends ComponentBase implements OnInit, AfterViewInit {

  recentPosts: BlogPostSummary[];
  currentId: string;

  constructor(private recentPostsService: RecentPostsService, private router: RoutingService) {
    super();
  }

  ngOnInit() {
    // TODO: Add id to the data passed down so the subscriber knows more about where the app is and can react. In this case, compare id with summary.id to mark active item
    this.router.routeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: { url: string, data: any }) => {
        const frags = event.url.split('/');
        if (frags.length > 2 && frags[frags.length - 2] === 'posts') {
          // Site is navigated to the blog posts view. Extract out the ID
          this.currentId = frags[frags.length - 1];
        } else {
          this.currentId = null;
        }
      });
  }

  ngAfterViewInit() {
    this.recentPostsService.get().subscribe(result => {
      this.recentPosts = result;
    });
  }

  navigate(id: string) {
    this.router.gotoBlogPost(id);
  }
}
