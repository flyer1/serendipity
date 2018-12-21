import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../services/blog.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  private id: string;
  post: BlogPost;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.blogService.get(this.id).subscribe(blogPost => {
      this.post = blogPost;
    });
  }
}

