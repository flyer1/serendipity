import { Component, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NotifierService } from './notifier.service';
import { ComponentBase } from '../component/component-base';
import { NotifierModel } from './notifier.model';

// How long to display the message before it automatically closes
const MESSAGE_TIMEOUT = 6000;

/**
 * Render a notification bar with some animations.
 * Credit for this design goes to: https://tympanus.net/Development/NotificationStyles/bar-slidetop.html.
 * There is some fantastic js/css in there.
 *
 * NOTE: I'm not using angular animation framework here b/c after using it for countless hours, it still is a major pain/headache to work with.
 * It is far more clear to use css animations directly, especially when relying upon an animation delay for the inner elements.
 * B/c we are not using angular animations, we need to trigger the change detection in order to tell angular to do it's binding business before we can process
 * the show.
 */
@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
})
export class NotifierComponent extends ComponentBase implements OnInit {

  @ViewChild('notifier') notifier: ElementRef;

  message: string;
  isEnabled = false;
  timeoutHandler: any;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef, private notifierService: NotifierService) {
    super();
  }

  ngOnInit() {
    this.notifierService.messageStream$.pipe(takeUntil(this.destroy$)).subscribe((data: NotifierModel) => this.show(data));
  }

  show(data: NotifierModel) {

    // As we are rendering a message, pause any incoming messages
    this.notifierService.pause();
    this.message = data.message;
    this.isEnabled = true;

    // Let angular do it's binding business before we process the show not using the angular animation framework.
    // Another way to handle this step is to add the template to the DOM on demand. But for now, we simply use an ngIf in the template.
    this.cdr.detectChanges();

    this.renderer.addClass(this.notifier.nativeElement, 'show');

    this.timeoutHandler = setTimeout(_ => this.close(), MESSAGE_TIMEOUT);
  }

  close() {
    clearTimeout(this.timeoutHandler);

    this.renderer.removeClass(this.notifier.nativeElement, 'show');

    setTimeout(_ => {
      this.notifier.nativeElement.addEventListener('animationend', this.onAnimationEnd.bind(this));
      this.renderer.addClass(this.notifier.nativeElement, 'hide');
    }, 25);
  }

  onAnimationEnd() {
    this.notifier.nativeElement.removeEventListener('animationend', this.onAnimationEnd);

    // Now that the hide animation has completed, toggle the flag that "removes" the template from the DOM
    this.isEnabled = false;

    // Tell the notifier that it's now okay to send any new messages our way
    this.notifierService.resume();
  }
}
