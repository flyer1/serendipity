import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { Error404Component } from './shared/error-pages/error-404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  /** Fall through route to catch invalid URLs and redirecting to 404 page */
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HomeComponent, Error404Component];

