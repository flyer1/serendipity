import { Component, OnInit } from '@angular/core';
import { TwitterService } from './core/social/twitter.service';
import { RoutingService } from './core/routing/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'website';

  constructor(private router: RoutingService, private twitterService: TwitterService) { }

  ngOnInit() {
    this.router.initialize();
    this.twitterService.initialize();
  }
}
