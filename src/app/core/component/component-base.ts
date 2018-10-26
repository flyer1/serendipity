import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/** An abstract class that manages a destroy observable that is completed when the component is destroyed */
export abstract class ComponentBase implements OnDestroy {

  protected destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
