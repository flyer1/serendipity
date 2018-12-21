import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * A directive that sets a default link on an <a> element that does not have an href attribute. This is required for some screen readers.
 */
@Directive({
    selector: '[appLink]'
})
export class LinkDirective {

    constructor(@Inject(DOCUMENT) document: any, el: ElementRef) {
        if (el.nativeElement.nodeName === 'A') {
            if (!el.nativeElement.getAttribute('href')) {
                el.nativeElement.setAttribute('href', document.location.href);
            }
        } else {
            throw Error('The appLink directive can only be put on anchor elements.');
        }
    }

    @HostListener('click', ['$event']) onclick(event: MouseEvent) {
        // Stop the default behavior of attempting to navigate to the generated href
        event.preventDefault();
        event.stopPropagation();
    }
}
