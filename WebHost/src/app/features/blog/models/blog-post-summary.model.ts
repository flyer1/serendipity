import { dateDiffInDays, stringToDate } from 'src/app/core/helpers/date-helper';

export class BlogPostSummary {
  id: string;
  title: string;
  date: string;
  // How many days ago the post was written
  age: number;

  constructor(data: any) {
    [this.id, this.title, this.date] = [data.id, data.title, data.date];

    this.age = dateDiffInDays(stringToDate(this.date), new Date());
  }
}
