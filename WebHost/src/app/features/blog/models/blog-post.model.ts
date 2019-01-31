import { SafeHtml } from '@angular/platform-browser';
import { parse } from 'date-fns';

import { MarkdownService } from 'src/app/core/formatter/markdown.service';
import { BlogPostSummary } from './blog-post-summary.model';

export class BlogPost {
  id: string;
  title: string;
  date: Date;
  content: string;

  // Computed properties
  by: string;
  formattedContent: SafeHtml;

  // Set by service
  previousPost: BlogPostSummary;
  nextPost: BlogPostSummary;

  constructor(data: any, markdown: MarkdownService) {
    Object.assign(this, data);

    this.date = parse(this.date);

    // this.by = '******';

    if (markdown) {
      this.formattedContent = markdown.compile(this.content);
    }
  }
}
