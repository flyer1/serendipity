import { RouterService } from '../../../core/routing/router.service';

export abstract class BaseNavComponent {

    constructor(protected appRouterService: RouterService) {
    }

    navigate(url) {
        this.appRouterService.gotoUrl(url);
    }
}
