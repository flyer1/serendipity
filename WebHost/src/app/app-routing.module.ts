import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { Error404Component } from './shared/error-pages/error-404.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'blog' },
  { path: 'blog', loadChildren: './features/blog/blog.module#BlogModule' },
  { path: 'about', loadChildren: './features/about/about.module#AboutModule' },
  { path: 'contact', loadChildren: './features/contact/contact.module#ContactModule' },

  /** Fall through route to catch invalid URLs and redirecting to 404 page */
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [Error404Component];

