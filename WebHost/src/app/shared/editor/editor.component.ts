import { Component, forwardRef, ViewChild, ElementRef, HostListener } from '@angular/core';
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

  @ViewChild('input') input: ElementRef;

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
    let selectedValue = '';

    const selection = new Selection(this.input.nativeElement);

    if (selection.length > 0) {
      selectedValue = this.value.substr(selection.start, selection.length);
    }

    switch (tool) {
      case 'heading':
        break;
      case 'bold':
        newValue = newValue.substr(0, selection.start) + '**' + selectedValue + '**' + newValue.substr(selection.end);
        break;
      case 'italic':
        newValue = newValue.substr(0, selection.start) + '_' + selectedValue + '_' + newValue.substr(selection.end);
        break;
      case 'link':
        newValue = newValue.substr(0, selection.start) + '![](PASTE_URL_HERE)' + newValue.substr(selection.end);
        break;
      case 'code':
        break;
      case 'list-bullet':
        newValue += '\n* ';
        break;
      case 'list-ordered':
        newValue += '\n1. ';
        break;
      case 'you-tube':
        newValue += '<iframe class="youtube-player" type="text/html" src="https://www.youtube.com/embed/Ade4omJymiI?version=3&amp;rel=1&amp;fs=1&amp;autohide=2&amp;showsearch=0&amp;showinfo=1&amp;iv_load_policy=1&amp;wmode=transparent" allowfullscreen="true" style="border:0;" id="fitvid0"></iframe>';
    }

    this.writeValue(newValue);
  }

  @HostListener('keypress', ['$event']) onKeyDown(event: KeyboardEvent) {

    if (!event.ctrlKey) { return; }

    let handled = true;

    switch (event.code) {
      case 'KeyB':
        this.toolbar('bold');
        break;
      case 'KeyI':
        this.toolbar('italic');
        break;
      default:
        handled = false;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

class Selection {
  start: number;
  end: number;
  get length() { return this.end - this.start; }

  constructor(private element: HTMLTextAreaElement) {
    this.start = element.selectionStart;
    this.end = element.selectionEnd;
  }
}
