import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from '../services/blog.service';
import { BlogPost } from '../models/blog-post.model';
import { RoutingService } from 'src/app/core/routing/routing.service';

@Component({
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  private id: string;
  post: BlogPost;

  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: RoutingService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.blogService.get(this.id).subscribe(blogPost => {
      this.post = blogPost;
    });
  }

  navigateToProfile() {
    this.router.gotoAbout();
  }
}

