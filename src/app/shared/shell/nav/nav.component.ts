import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';
import { RoutingService } from '../../../core/routing/routing.service';
import { BaseNavComponent } from './base-nav.component';
import { ActivatedRoute } from '@angular/router';

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

    constructor(routingService: RoutingService, private route: ActivatedRoute) {
        super(routingService);
    }

    ngOnInit() {
        this.pageTitle$ = this.routingService.pageTitle$;
    }

    toggleMobileMenu() {
        this.toggleMobileMenuFlag();
    }

    private toggleMobileMenuFlag() {
        this.isMobileMenuCollapsed = !this.isMobileMenuCollapsed;
    }
}


