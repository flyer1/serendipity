import { Component } from '@angular/core';

import { ComponentBase } from '../component/component-base';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
})
export class NotifierComponent extends ComponentBase {

  isClosed = false;

  constructor() {
    super();
  }

  close() {
    this.isClosed = true;

    setTimeout(_ => this.isClosed = false, 2000);
  }
}
