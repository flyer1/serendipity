import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { Subject, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterService {

    private routeDataSubject$ = new ReplaySubject<any>(1);
    private pageTitleSubject$ = new ReplaySubject<string>(1);
    private pageTitleSuffix: string;
    private destroy$ = new Subject();

    pageTitle$ = this.pageTitleSubject$.asObservable();
    routeData$ = this.routeDataSubject$.asObservable();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location, private title: Title, private meta: Meta) { }

    gotoError(): Promise<boolean> {
        return this.navigateByUrl('error');
    }

    gotoUrl(url): Promise<boolean> {
        return this.navigateByUrl(url);
    }

    goBack(): void {
        this.location.back();
    }

    openInNewTab(url: string): Window {
        return window.open(url, '_blank');
    }

    navigateByUrl(url: string, replaceUrl: boolean = false): Promise<boolean> {
        return this.router.navigateByUrl(url, { replaceUrl: replaceUrl });
    }

    initialize(pageTitleSuffix: string) {
        this.pageTitleSuffix = pageTitleSuffix;

        this.router.events.pipe(
            takeUntil(this.destroy$),
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            let route = this.activatedRoute;
            let data: any;
            let title = '';
            let description = '';

            do {
                route = route.firstChild;
                if (!!route.snapshot.routeConfig.data) {
                    data = route.snapshot.routeConfig.data;
                    title = route.snapshot.routeConfig.data['title'];
                    description = route.snapshot.routeConfig.data['description'];
                }
            } while (route.children.length > 0);

            this.setTitle(title);
            this.setDescription(description);
            this.routeDataSubject$.next(data);
        });

    }

    terminate() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setTitle(title: string) {
        this.pageTitleSubject$.next(title);
        this.title.setTitle(`${title} - ${this.pageTitleSuffix}`);
    }

    private setDescription(description: string) {
        this.meta.updateTag({ name: 'description', content: description });
    }
}

