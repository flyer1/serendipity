import { NgModule } from '@angular/core';
import { FooterComponent } from './shell/footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TwitterComponent } from './twitter/twitter.component';
import { NavComponent } from './shell/nav/nav.component';

@NgModule({
    imports: [
    ],
    declarations: [
        TwitterComponent,
        SideBarComponent,
        NavComponent,
        FooterComponent
    ],
    exports: [
        TwitterComponent,
        SideBarComponent,
        NavComponent,
        FooterComponent
    ],
    providers: [
        {provide: 'window', useFactory: windowFactory}
    ],
})
export class SharedModule { }


///////////////////////////////
export function windowFactory() {
    return window;
}
