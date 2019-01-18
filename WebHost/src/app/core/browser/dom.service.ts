import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DomService {
  querySelector(containerElement: Element, query: string): HTMLElement {
    return containerElement.querySelector(query);
  }
}

