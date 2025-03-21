import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './auth/layout/layout.component';
import { PagesLayoutComponent } from './layouts/layout/layout.component';
import { authGuard } from './guards/auth.guard';
 
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {path: 'pos', component: PagesLayoutComponent, loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule), canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
