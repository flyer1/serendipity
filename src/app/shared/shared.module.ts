import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shell/footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TwitterComponent } from './twitter/twitter.component';
import { NavComponent } from './shell/nav/nav.component';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TwitterComponent,
        SideBarComponent,
        NavComponent,
        FooterComponent,
        PhotoCardComponent,
        BlogPostsComponent
    ],
    exports: [
        TwitterComponent,
        SideBarComponent,
        NavComponent,
        FooterComponent,
        PhotoCardComponent,
        BlogPostsComponent
    ],
    providers: [
        { provide: 'window', useFactory: windowFactory }
    ],
})
export class SharedModule { }


///////////////////////////////
export function windowFactory() {
    return window;
}
