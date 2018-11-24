import { Component, OnInit } from '@angular/core';
import { TwitterService } from './core/social/twitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'website';

  constructor(private twitterService: TwitterService) { }

  ngOnInit() {
    this.twitterService.initialize();
  }
}
