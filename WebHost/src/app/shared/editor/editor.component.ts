import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ComponentBase } from 'src/app/core/component/component-base';
import { MarkdownService } from 'src/app/core/formatter/markdown.service';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent extends ComponentBase implements OnInit {

  @Input() content: string;

  private form: FormGroup;

  private get formFields() { return this.form.value; }

  constructor(private fb: FormBuilder, private markdown: MarkdownService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({ content: '', formattedContent: '' });

    this.form.get('content')
      .valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(val => {
        // this.post.formattedContent = this.markdown.compile(val);
      });
  }

  toolbar(tool: string) {
    let newContent = this.formFields.content;

    switch (tool) {
      case 'heading':
        break;
      case 'bold':
        newContent += ' ****';
        break;
      case 'italic':
        newContent += ' __';
        break;
      case 'link':
        newContent += '\n![](PASTE_URL_HERE)';
        break;
      case 'code':
        break;
      case 'list-bullet':
        newContent += '\n* ';
        break;
      case 'list-ordered':
        newContent += '\n1. ';
        break;
    }

    this.form.patchValue({ content: newContent });
  }
}
