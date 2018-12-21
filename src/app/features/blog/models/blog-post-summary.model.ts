export class BlogPostSummary {
  id: string;
  title: string;
  date: Date;

  constructor(data: any) {
    [this.id, this.title, this.date] = [data.id, data.title, data.date];
  }
}
