import { Component, ViewEncapsulation } from '@angular/core';

import { RouterService } from '../../../core/routing/router.service';
import { BaseNavComponent } from './base-nav.component';
import { mobileNavAnimation } from './nav.animation';

@Component({
    templateUrl: './mobile-nav.component.html',
    animations: [mobileNavAnimation],
    styleUrls: [ './mobile-nav.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class MobileNavComponent extends BaseNavComponent {

    isReady = false;
    isMobileMenuCollapsed = true;

    constructor(routerService: RouterService) {
        super(routerService);
    }

    navigate(url) {
        super.navigate(url);
    }
}
