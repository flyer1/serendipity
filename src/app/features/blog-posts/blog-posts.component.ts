import { Component, OnInit } from '@angular/core';
import { BlogPostService } from './services/blog-posts.service';
import { BlogPosts } from './models/blog-posts.model';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {

  data: BlogPosts;

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit() {
    this.blogPostService.get().subscribe(response => {
      console.log('got this', response);
      this.data = response;
    });
  }
}
