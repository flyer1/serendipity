import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { NotifierModel, notifierTypes } from './notifier.model';

// Pause between rendering subsequent messages
const TIME_BETWEEN_MESSAGES = 1000;

@Injectable({ providedIn: 'root' })
export class NotifierService {

  private messageStreamSubject$ = new ReplaySubject<NotifierModel>();
  private messageQueue: NotifierModel[] = [];
  messageStream$ = this.messageStreamSubject$.asObservable();
  paused = false;

  queueMessage(message: string, type: notifierTypes = 'info') {
    this.messageQueue.push({ message: message, type: type });
    this.processMessageQueue();
  }

  processMessageQueue() {
    if (this.paused) { return; }
    if (this.messageQueue.length === 0 ) { return; }

    this.messageStreamSubject$.next(this.messageQueue.shift());
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    setTimeout(_ => this.processMessageQueue(), TIME_BETWEEN_MESSAGES);
  }
}

