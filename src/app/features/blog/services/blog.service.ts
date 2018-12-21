import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/core/data/api.service';
import { BlogPosts } from '../models/blog-posts.model';

@Injectable()
export class BlogService {
  constructor(private apiService: ApiService) { }

  get(): Observable<BlogPosts> {
    return this.apiService.getJson('./assets/data/blog-posts.json')
      .pipe(map(result => new BlogPosts(result)));
  }
}
