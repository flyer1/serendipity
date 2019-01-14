import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shell/footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TwitterComponent } from './twitter/twitter.component';
import { NavComponent } from './shell/nav/nav.component';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';
import { LinkDirective } from './directives/link.directive';
import { MobileNavComponent } from './shell/nav/mobile-nav.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditorComponent,
    FooterComponent,
    LinkDirective,
    MobileNavComponent,
    NavComponent,
    PhotoCardComponent,
    RecentPostsComponent,
    SideBarComponent,
    SubscribeComponent,
    TwitterComponent,
  ],
  exports: [
    EditorComponent,
    FooterComponent,
    LinkDirective,
    MobileNavComponent,
    NavComponent,
    PhotoCardComponent,
    RecentPostsComponent,
    SideBarComponent,
    SubscribeComponent,
    TwitterComponent,
    ReactiveFormsModule,
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
