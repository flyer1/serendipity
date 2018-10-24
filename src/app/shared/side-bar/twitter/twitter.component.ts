import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';
import { TwitterService } from 'src/app/core/network/twitter.service';

@Component({
    selector: 'app-twitter',
    templateUrl: 'twitter.component.html'
})

export class TwitterComponent implements AfterViewInit {

    @Input() tweetId = '617749885933232128';

    constructor(private el: ElementRef, private twitterService: TwitterService) { }

    ngAfterViewInit() {
        this.twitterService.loadScript().subscribe(twttr => this.onLoaded());
    }

    onLoaded() {
        const nativeElement = this.el.nativeElement;

        window['twttr'].widgets.createTweet(this.tweetId, nativeElement, {})
            .then(
                function success(embed) {
                    console.log('Created tweet widget: ', embed);
                }).catch(
                    function creationError(message) {
                        console.log('Could not create widget: ', message);
                    });
    }
}
