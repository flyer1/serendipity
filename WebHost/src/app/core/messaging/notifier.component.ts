import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

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
export class NotifierComponent implements AfterViewInit {

  @ViewChild('notifier') notifier: ElementRef;

  isEnabled = true;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.show();
  }

  show() {
    this.isEnabled = true;

    // Let angular do it's binding business before we process the show not using the angular animation framework.
    // Another way to handle this step is to add the template to the DOM on demand. But for now, we simply use an ngIf in the template.
    this.cdr.detectChanges();

    this.renderer.addClass(this.notifier.nativeElement, 'show');
  }

  close() {
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

    // For now, just show it again after a second.
    setTimeout(this.show.bind(this), 1000);
  }
}
