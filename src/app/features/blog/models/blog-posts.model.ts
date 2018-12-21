import { BlogPost } from './blog-post.model';

export class BlogPosts {
  results: BlogPost[];
  pageIndex: number;
  totalPages: number;
  totalRows: number;

  constructor(data?: { results: any, pageIndex: number, totalPages: number, totalRows: number }) {
    [this.pageIndex, this.totalPages, this.totalRows] = [data.pageIndex, data.totalPages, data.totalRows];
    this.results = data.results.map(result => new BlogPost(result));
  }
}
