import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationMessageService {

  messageQueue: string[];

  constructor() { }

  // TODO: Build up a queue of messages that are rendered one by one after a duration has expired.

  show() {
    // queue up the next message.
  }

  private processQueue() {

    // TODO how to add the component to the DOM in realtime? We don't have Angular Material here. I've done this type of thing before
  }
}

