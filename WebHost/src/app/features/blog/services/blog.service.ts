import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from 'src/app/core/data/api.service';
import { BlogPosts } from '../models/blog-posts.model';
import { compare } from 'src/app/core/helpers/common-helpers';
import { BlogPost } from '../models/blog-post.model';
import { MarkdownService } from 'src/app/core/formatter/markdown.service';
import { BlogPostSummary } from '../models/blog-post-summary.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private apiService: ApiService, private markdownService: MarkdownService, private sanitizer: DomSanitizer) { }

  getAll(): Observable<BlogPosts> {
    return this.apiService.getJson('./assets/data/blog-posts.json')
      .pipe(map(result => this.resolveGetAll(result)));
  }

  resolveGetAll(data: any): BlogPosts {
    const blogPosts = new BlogPosts(data, this.markdownService, this.sanitizer);
    blogPosts.results.sort((a, b) => compare(a.date, b.date, false));
    return blogPosts;
  }

  get(id: string): Observable<BlogPost> {
    return this.apiService.getJson('./assets/data/blog-posts.json')
      .pipe(map(result => this.resolveGet(result, id)));
  }

  resolveGet(data: BlogPosts, id: string): BlogPost {
    let blogPost: BlogPost;

    data.results.sort((a, b) => compare(a.date, b.date, false));
    const found = data.results.filter(item => item.id === id);

    if (found && found.length === 1) {
      blogPost = new BlogPost(found[0], this.markdownService, this.sanitizer);
      const index = data.results.indexOf(found[0]);
      if (index > 0) {
        blogPost.previousPost = new BlogPostSummary(data.results[index - 1]);
      }
      if (index < data.results.length - 1) {
        blogPost.nextPost = new BlogPostSummary(data.results[index + 1]);
      }
    } else {
      console.warn(`Could not find blog post (item: ${id})`);
    }

    return blogPost;
  }

  filterById(blogPosts: BlogPosts, id: string): BlogPost {
    const filteredPosts = blogPosts.results.filter(p => p.id === id);
    return filteredPosts.length > 0 ? filteredPosts[0] : null;
  }
}
