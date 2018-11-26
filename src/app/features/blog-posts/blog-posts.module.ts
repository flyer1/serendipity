import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { BlogPostsComponent } from './blog-posts.component';
import { BlogPostService } from './services/blog-posts.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [BlogPostsComponent],
  exports: [BlogPostsComponent],
  providers: [BlogPostService]
})
export class BlogPostsModule { }
