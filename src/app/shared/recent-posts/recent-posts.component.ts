import { Component, AfterViewInit } from '@angular/core';

import { RecentPostsService } from './services/recent-posts.service';
import { BlogPostSummary } from 'src/app/features/blog/models/blog-post-summary.model';
import { RoutingService } from 'src/app/core/routing/routing.service';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
  providers: [RecentPostsService]
})
export class RecentPostsComponent implements AfterViewInit {

  recentPosts: BlogPostSummary[];

  constructor(private recentPostsService: RecentPostsService, private router: RoutingService) { }

  ngAfterViewInit() {
    this.recentPostsService.get().subscribe(result => {
      this.recentPosts = result;
    });
  }

  navigate(id: string) {
    this.router.gotoBlogPost(id);
  }
}
