import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogService } from './services/blog.service';

const routes: Routes = [
  {
    path: '',
    component: BlogPostsComponent,
    data: { title: 'Blog Posts', description: 'Blog posts by Serendipity' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule],
  declarations: [BlogPostsComponent],
  providers: [BlogService]
})
export class BlogModule { }
