import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { BlogPostSummary } from 'src/app/features/blog/models/blog-post-summary.model';
import { BlogService } from 'src/app/features/blog/services/blog.service';

@Injectable()
export class RecentPostsService {
  constructor(private blogService: BlogService) { }

  get(): Observable<BlogPostSummary[]> {
    return this.blogService.getAll()
      .pipe(take(5),
        map(blogPosts => blogPosts.results.map(post => new BlogPostSummary(post)))
      );
  }
}
