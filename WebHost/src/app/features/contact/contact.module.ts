import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: { title: 'Contact', description: 'Contact', isTopLevelFeature: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  declarations: [ContactComponent],
  providers: []
})
export class ContactModule { }
