import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BlogService } from '../services/blog.service';
import { BlogPosts } from '../models/blog-posts.model';
import { RoutingService } from 'src/app/core/routing/routing.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogPostsComponent implements OnInit {

  data: BlogPosts;

  constructor(private blogService: BlogService, private router: RoutingService) { }

  ngOnInit() {
    this.blogService.getAll().subscribe(response => {
      this.data = response;
    });
  }

  navigate(id: string) {
    this.router.gotoBlogPost(id);
  }
}
