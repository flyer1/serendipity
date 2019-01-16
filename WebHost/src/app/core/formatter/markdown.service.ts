import { Injectable } from '@angular/core';
import { NgxMdService } from 'ngx-md';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class MarkdownService {

  constructor(private markdown: NgxMdService, private sanitizer: DomSanitizer) {}

  compile(input: string): SafeHtml {
    const sanitize = false;
    const compiledInput = this.markdown.compile(input, sanitize);
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(compiledInput);
    return safeHtml;
  }
}
