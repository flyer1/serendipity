import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';
import { RouterService } from '../../../core/routing/router.service';
import { MobileNavComponent } from './mobile-nav.component';
import { BaseNavComponent } from './base-nav.component';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: [ './nav.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class NavComponent extends BaseNavComponent implements OnInit {
    @ViewChild('mobileNavTrigger') mobileNavTrigger: ElementRef;

    isMobileMenuCollapsed = true;

    pageTitle$: Observable<string>;

    constructor(routerService: RouterService) {
        super(routerService);
    }

    ngOnInit() {
        this.pageTitle$ = this.appRouterService.pageTitle$;
    }

    toggleMobileMenu() {
        this.toggleMobileMenuFlag();
    }

    private toggleMobileMenuFlag() {
        this.isMobileMenuCollapsed = !this.isMobileMenuCollapsed;
    }
}


