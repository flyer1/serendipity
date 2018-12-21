import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/core/data/api.service';
import { BlogPosts } from '../models/blog-posts.model';
import { compare } from 'src/app/core/helpers/common-helpers';
import { BlogPost } from '../models/blog-post.model';
import { MarkdownService } from 'src/app/core/formatter/markdown.service';

@Injectable()
export class BlogService {
  constructor(private apiService: ApiService, private markdown: MarkdownService) { }

  getAll(): Observable<BlogPosts> {
    return this.apiService.getJson('./assets/data/blog-posts.json')
      .pipe(map(result => {
        const blogPosts = new BlogPosts(result, this.markdown);
        blogPosts.results.sort((a, b) => compare(a.date, b.date, false));
        return blogPosts;
      }));
  }

  get(id: string): Observable<BlogPost> {
    return this.apiService.getJson('./assets/data/blog-posts.json')
      .pipe(map(result => this.filterById(new BlogPosts(result, this.markdown), id)));
  }

  filterById(blogPosts: BlogPosts, id: string): BlogPost {
    const filteredPosts = blogPosts.results.filter(p => p.id === id);
    return filteredPosts.length > 0 ? filteredPosts[0] : null;
  }
}
