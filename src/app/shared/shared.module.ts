import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TwitterComponent } from './side-bar/twitter/twitter.component';
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
    providers: [],
})
export class SharedModule { }
