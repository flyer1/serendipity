import { Component } from '@angular/core';

import { ComponentBase } from '../component/component-base';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss'],
})
export class NotificationMessageComponent extends ComponentBase {

  constructor() {
    super();
  }

}
