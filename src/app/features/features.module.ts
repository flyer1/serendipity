import { NgModule } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TwitterComponent } from './side-bar/twitter/twitter.component';

@NgModule({
    imports: [],
    exports: [
        SideBarComponent
    ],
    declarations: [
        TwitterComponent,
        SideBarComponent
    ],
    providers: [],
})
export class FeaturesModule { }
