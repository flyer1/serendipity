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

  constructor(private recentPostsService: RecentPostsService, private router: RoutingService) {
    super();
  }

  ngOnInit() {
    // TODO: Add id to the data passed down so the subscriber knows more about where the app is and can react. In this case, compare id with summary.id to mark active item
    this.router.routeData$.pipe(takeUntil(this.destroy$)).subscribe(d => { console.log(d); });
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
