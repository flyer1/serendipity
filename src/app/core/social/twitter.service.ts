import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TwitterService {

    // PROPERTIES ////////////
    public get twitterApi() {
        return this.window[this.TWITTER_WINDOW_PROPERTY];
    }

    // MEMBER VARS ////////////
    readonly TWITTER_SCRIPT_ID = 'twitter-wjs';
    readonly TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';
    readonly TWITTER_WINDOW_PROPERTY = 'twttr';

    twitterReadySubject = new BehaviorSubject(false);
    twitterReady$ = this.twitterReadySubject.asObservable();

    // IMPLEMENTATION //////////
    constructor(@Inject('window') private window: Window) {}

    initialize() {
        this.startScriptLoad();
        this.twitterApi.ready(f => {
            this.twitterReadySubject.next(true);
        });
    }

    // Load the script into the DOM
    private startScriptLoad() {
        window[this.TWITTER_WINDOW_PROPERTY] = (function (doc, script, id, url) {
            let scriptEl: HTMLScriptElement;
            const fjs = doc.getElementsByTagName(script)[0];
            const twitter = window['twttr'] || {};

            if (doc.getElementById(id)) { return twitter; }

            scriptEl = doc.createElement(script) as HTMLScriptElement;
            scriptEl.id = id;
            scriptEl.src = url;
            fjs.parentNode.insertBefore(scriptEl, fjs);

            twitter._e = [];

            twitter.ready = function (f) {
                twitter._e.push(f);
            };

            return twitter;
        }(document, 'script', this.TWITTER_SCRIPT_ID, this.TWITTER_WIDGET_URL));
    }
}
