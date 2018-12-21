
export class BlogPost {
  id: string;
  title: string;
  date: Date;
  content: string;

  // Computed properties
  preview: string;
  by: string;

  constructor(data: any) {
    Object.assign(this, data);
    this.preview = this.content.substr(0, 100) + '...';
    this.by = 'Liz Dias';
  }
}
