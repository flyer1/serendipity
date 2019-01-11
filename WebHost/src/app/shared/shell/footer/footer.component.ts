import { Component } from '@angular/core';

import { RoutingService } from 'src/app/core/routing/routing.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    copyrightYear = new Date().getFullYear();

    constructor(private router: RoutingService) {}

    /**
   * A little easter egg to get into the blog post editor (nothing is persisted on the back end, this is just used to build the markdown)
   */
    addBlogPost() {
        this.router.gotoNewBlogPost();
    }
}
