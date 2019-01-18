import { Injectable } from '@angular/core';

const DOCUMENT_ELEMENT  = window.document.documentElement;

@Injectable({ providedIn: 'root' })
export class ViewportService {

  inViewport(el: HTMLElement, h: number) {
    const elH = el.offsetHeight;
    const scrolled = this.scrollY();
    const viewed = scrolled + this.getViewportH();
    const elTop = this.getOffset(el).top;
    const elBottom = elTop + elH;
    // if 0, the element is considered in the viewport as soon as it enters.
    // if 1, the element is considered in the viewport only when it's fully inside
    // value in percentage (1 >= h >= 0)
    h = h || 0;

    return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
  }

  getViewportH() {
    const client = DOCUMENT_ELEMENT['clientHeight'];
    const inner = window['innerHeight'];

    if (client < inner) {
      return inner;
    } else {
      return client;
    }
  }

  // http://stackoverflow.com/a/5598797/989439
  getOffset(el: HTMLElement) {
    let offsetTop = 0;
    let offsetLeft = 0;

    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }
      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while (el = el.offsetParent as HTMLElement);

    return {
      top: offsetTop,
      left: offsetLeft
    };
  }

  scrollY() {
    return window.pageYOffset || DOCUMENT_ELEMENT.scrollTop;
  }

}

