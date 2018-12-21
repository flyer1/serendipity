import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogService } from './services/blog.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BlogPostsComponent],
  exports: [BlogPostsComponent],
  providers: [BlogService]
})
export class BlogModule { }
