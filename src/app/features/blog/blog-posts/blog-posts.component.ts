import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BlogPosts } from '../models/blog-posts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {

  data: BlogPosts;

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogService.get().subscribe(response => {
      console.log('got this', response);
      this.data = response;
    });
  }

  navigate(id: string) {
    this.router.navigate(['blog/post', id]);
  }
}
