import { HostListener, OnDestroy, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComponentBase } from '../component/component-base';

/** A base class that is used by components that are opened as an overlay by the popoverTriggerBase.
*/
export abstract class PopoverComponentBase extends ComponentBase implements OnDestroy {

  /** Subject for notifying that the popover has been closed */
  readonly onHide$: Subject<any> = new Subject();

  constructor(private el: ElementRef) {
    super();
  }

  hide() {
    this.onHide$.next();
  }

  /** Returns an observable that notifies when the popover has been hidden from view. */
  afterHidden(): Observable<void> {
    return this.onHide$.asObservable();
  }

  // tslint:disable-next-line:comment-format
  //** put listener on body to see if the user clicks outside of the popover */
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.hide();
    }
  }

  ngOnDestroy() {
    this.onHide$.next();
    this.onHide$.complete();
  }
}
