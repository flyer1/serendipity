import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TwitterService {
    readonly TWITTER_SCRIPT_ID = 'twitter-wjs';
    readonly TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';

    loadScript(): Observable<any> {
        const that = this;

        return Observable.create(observer => {
            that.startScriptLoad();

            window['twttr'].ready(
                function onLoadTwitterScript(twttr) {
                    observer.next(twttr);
                    observer.complete();
                });
        });
    }

    // Load the script into the DOM
    private startScriptLoad() {
        window['twttr'] = (function (doc, script, id, url) {
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
