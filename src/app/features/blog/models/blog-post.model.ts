
export class BlogPost {
  id: string;
  title: string;
  date: Date;
  content: string;

  // Computed properties
  preview: string;

  constructor(data: any) {
    Object.assign(this, data);
    this.preview = this.content.substr(0, 100) + '...';
  }
}
