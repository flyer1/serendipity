import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { BlogPosts } from '../models/blog-posts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  data: BlogPosts;

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogService.get().subscribe(response => {
      console.log('got this', response);
      this.data = response;
    });
  }

  navigate() {
    // this.router.navigate(['admin/batch-mgmt', this.selectedBatch.batchNumber]);
  }
}
