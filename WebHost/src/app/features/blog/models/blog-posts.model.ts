import { DomSanitizer } from '@angular/platform-browser';

import { BlogPost } from './blog-post.model';
import { MarkdownService } from 'src/app/core/formatter/markdown.service';

export class BlogPosts {
  results: BlogPost[];
  pageIndex: number;
  totalPages: number;
  totalRows: number;

  constructor(data: { results: any, pageIndex: number, totalPages: number, totalRows: number }, markdown: MarkdownService, sanitizer: DomSanitizer) {
    [this.pageIndex, this.totalPages, this.totalRows] = [data.pageIndex, data.totalPages, data.totalRows];
    this.results = data.results.map((result: BlogPost) => new BlogPost(result, markdown, sanitizer));
  }
}
