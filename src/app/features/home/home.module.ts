import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Blog Posts', description: 'Blog posts by Serendipity' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule { }
