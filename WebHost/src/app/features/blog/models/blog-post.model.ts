import { MarkdownService } from 'src/app/core/formatter/markdown.service';
import { BlogPostSummary } from './blog-post-summary.model';

export class BlogPost {
  id: string;
  title: string;
  date: Date;
  content: string;

  // Computed properties
  by: string;
  preview: string;
  formattedContent: string;

  // Set by service
  previousPost: BlogPostSummary;
  nextPost: BlogPostSummary;

  constructor(data: any, markdown: MarkdownService) {
    Object.assign(this, data);

    let preview = this.content;
    // Remove references to images
    const regex = /\!\[.*\]\(.*\)/gi;
    preview = preview.replace(regex, '');
    this.preview = preview.substr(0, 500);

    if (this.content.length > 500) { this.preview += '...'; }

    // this.by = '******';

    if (markdown) {
      this.formattedContent = markdown.compile(this.content);
    }
  }
}
