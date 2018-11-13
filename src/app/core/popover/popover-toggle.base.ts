import { OnDestroy, ViewContainerRef, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { OverlayRef, Overlay, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

import { ComponentBase } from '../component/component-base';

/** A base class to that creates a component from a trigger.
 * The component is added dynamically to the bottom of the DOM using the angular material CDK.
 */
export abstract class PopoverTriggerBase extends ComponentBase implements OnDestroy {

  overlayRef: OverlayRef | null;
  portal: ComponentPortal<ComponentType<any>>;
  componentInstance: any | null;

  constructor(private triggerElement: ElementRef, private componentType: ComponentType<any>, private overlay: Overlay, private viewContainerRef: ViewContainerRef) {
    super();
  }

  show(popoverData: any) {
    if (this.componentInstance) {
      this.hide();
      return;
    }

    this.createOverlay();
    this.detach();
    this.updatePosition();
    this.portal = new ComponentPortal(this.componentType, this.viewContainerRef);
    this.componentInstance = this.overlayRef.attach(this.portal).instance;

    // Pass over the data into the component instance
    if (popoverData) {
      // tslint:disable-next-line:forin
      for (const prop in popoverData) {
        this.componentInstance[prop] = popoverData[prop];
      }
    }

    // This observable allows a popover to send a message that it needs to be closed
    this.componentInstance.afterHidden()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.hide());

    return this.overlayRef;
  }

  createOverlay() {
    // Create connected position strategy.
    const strategy = this.overlay.position()
      .flexibleConnectedTo(this.triggerElement.nativeElement)
      .withTransformOriginOn('.popover-trigger') // tell the overlay to appear next to the trigger, even when scrolling.
      .withFlexibleDimensions(false)
      .withViewportMargin(8);

    const PANEL_CLASS = ['popover-overlay'];

    this.overlayRef = this.overlay.create({
      positionStrategy: strategy,
      panelClass: PANEL_CLASS,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.detachments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.detach());

    this.overlayRef.keydownEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: KeyboardEvent) => {
        if (event.key === 'Escape') { this.hide(); }
      });
  }

  hide() {
    this.detach();
  }

  private detach() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    this.componentInstance = null;
  }

  /** Updates the position of the current popover. */
  private updatePosition() {
    const position = this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;

    position.withPositions([
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
    ]);
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.componentInstance = null;
    }
  }
}
