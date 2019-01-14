import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ]
})
export class EditorComponent implements ControlValueAccessor {

  value: string;

  onChanged: any = () => { };
  onTouched: any = () => { };

  // #region ControlValueAccessor Implementation

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any) {
    // This is required by the ControlValueAccessor interface but we don't need it beyond that.
    this.onTouched = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onBlur() {
    if (this.value) {
      this.onChanged(this.value);
    }
  }

  // #endregion

  inputChanged(event) {
    this.value = event.target.value;
    this.onChanged(this.value);
  }

  toolbar(tool: string) {
    let newValue = this.value;

    switch (tool) {
      case 'heading':
        break;
      case 'bold':
        newValue += ' ****';
        break;
      case 'italic':
        newValue += ' __';
        break;
      case 'link':
        newValue += '\n![](PASTE_URL_HERE)';
        break;
      case 'code':
        break;
      case 'list-bullet':
        newValue += '\n* ';
        break;
      case 'list-ordered':
        newValue += '\n1. ';
        break;
    }

    this.writeValue(newValue);
  }
}
