import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NotifierComponent } from './messaging/notifier.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        NotifierComponent
    ],
    declarations: [
      NotifierComponent
    ],
    providers: [],
})
export class CoreModule { }
