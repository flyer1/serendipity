import { Injectable } from '@angular/core';
import { NgxMdService } from 'ngx-md';

@Injectable({ providedIn: 'root' })
export class MarkdownService {

  constructor(private markdown: NgxMdService) {}

  compile(input: string): string {
    const sanitize = false;
    return this.markdown.compile(input, sanitize);
  }
}
