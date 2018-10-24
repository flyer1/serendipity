import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TwitterComponent } from './side-bar/twitter/twitter.component';

@NgModule({
    imports: [],
    declarations: [
        TwitterComponent,
        SideBarComponent,
        FooterComponent
    ],
    exports: [
        TwitterComponent,
        SideBarComponent,
        FooterComponent
    ],
    providers: [],
})
export class SharedModule { }
