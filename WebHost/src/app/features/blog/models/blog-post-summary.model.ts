import { differenceInDays } from 'date-fns';

export class BlogPostSummary {
  id: string;
  title: string;
  date: string;
  // How many days ago the post was written
  age: number;

  constructor(data: any) {
    [this.id, this.title, this.date] = [data.id, data.title, data.date];

    this.age = differenceInDays(new Date(), this.date);
  }
}
