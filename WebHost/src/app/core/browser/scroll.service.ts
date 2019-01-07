import { Injectable } from '@angular/core';


/** A  service that is responsible for handling scrolling behaviours in the view */
@Injectable({ providedIn: 'root' })
export class ScrollService {

    /**
     * Scroll to top of body.
     * Utilize the native browser API to perform the scroll
     */
    scrollTop() {

        // We're just going to assume scroll to top until we need something more.
        const scrollOptions: ScrollToOptions = {
            left: 0,
            top: 0,
            behavior: 'smooth'
        };

        window.scrollTo(scrollOptions);
    }
}

