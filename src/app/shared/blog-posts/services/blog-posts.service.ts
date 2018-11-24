import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogPost } from '../models/blog-post.model';

@Injectable()
export class BlogPostService {
  constructor(private apiService: ApiService) {}

  get(): Observable<BlogPost[]> {
return this.api;
  }
}
