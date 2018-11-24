import { Component, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { TwitterService } from 'src/app/core/social/twitter.service';
import { ComponentBase } from 'src/app/core/component/component-base';

@Component({
  selector: 'app-twitter',
  templateUrl: 'twitter.component.html',
  styleUrls: ['twitter.component.scss']
})

export class TwitterComponent extends ComponentBase implements AfterViewInit {

  constructor( private twitterService: TwitterService) {
    super();
  }

  ngAfterViewInit() {
    this.twitterService.twitterReady$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isReady => {
        if (isReady) {
          this.twitterService.twitterApi.widgets.load();
        }
      });
  }
}
