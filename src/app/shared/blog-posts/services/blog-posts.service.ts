import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogPost } from '../models/blog-post.model';
import { ApiService } from 'src/app/core/data/api.service';

@Injectable()
export class BlogPostService {
  constructor(private apiService: ApiService) { }

  get(): Observable<BlogPost[]> {
    return this.apiService.get('app/shared/blog-posts/mocks/data.json');
  }
}
