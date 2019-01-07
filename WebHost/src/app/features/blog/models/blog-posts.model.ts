import { BlogPost } from './blog-post.model';
import { MarkdownService } from 'src/app/core/formatter/markdown.service';

export class BlogPosts {
  results: BlogPost[];
  pageIndex: number;
  totalPages: number;
  totalRows: number;

  constructor(data: { results: any, pageIndex: number, totalPages: number, totalRows: number }, markdown: MarkdownService) {
    [this.pageIndex, this.totalPages, this.totalRows] = [data.pageIndex, data.totalPages, data.totalRows];
    this.results = data.results.map(result => new BlogPost(result, markdown));
  }
}
