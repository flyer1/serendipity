import { MarkdownService } from 'src/app/core/formatter/markdown.service';
import { BlogPostSummary } from './blog-post-summary.model';

export class BlogPost {
  id: string;
  title: string;
  date: Date;
  content: string;
  previousPost: BlogPostSummary;
  nextPost: BlogPostSummary;

  // Computed properties
  by: string;
  preview: string;
  formattedContent: string;

  constructor(data: any, markdown: MarkdownService) {
    Object.assign(this, data);

    if (this.title === 'Demo Post') { this.setDemoPost(); }

    this.preview = this.content.substr(0, 100) + '...';
    this.by = 'Liz Dias';

    if (markdown) {
      this.formattedContent = markdown.compile(this.content);
    }
  }

  // A temp function that is used to educate about how to use markdown
  setDemoPost() {
    const content = `this is something
and now I can have newlines. Finally!
And it'll be much easier to work with
## okay
I'll go home now.`;
    this.content = content;
  }
}
