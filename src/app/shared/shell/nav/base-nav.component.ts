import { RoutingService } from '../../../core/routing/routing.service';

export abstract class BaseNavComponent {

    constructor(protected routingService: RoutingService) {
    }

    /** Cancels the default HREF navigation, and navigates to URL via the AppRouter;
      * we're doing this to prevent the HREF from causing a full page reload on navigation as per https://github.com/angular/angular/issues/18858
      * Note - can't lose the [href] binding as we need that for right-click, open in new tab
    */
    navigate(event: Event, url: string) {
        event.preventDefault();
        this.routingService.navigateByUrl(url);
    }
}
