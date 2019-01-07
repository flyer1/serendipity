import { Component, ViewEncapsulation } from '@angular/core';

import { RoutingService } from '../../../core/routing/routing.service';
import { BaseNavComponent } from './base-nav.component';
import { toggleMobileNavAnimation } from './nav.animation';

@Component({
    templateUrl: './mobile-nav.component.html',
    animations: [toggleMobileNavAnimation],
    styleUrls: [ './mobile-nav.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class MobileNavComponent extends BaseNavComponent {

    isReady = false;
    isMobileMenuCollapsed = true;

    constructor(routingService: RoutingService) {
        super(routingService);
    }

    navigate(event: Event, url: string) {
        super.navigate(event, url);
    }
}
