import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './auth/layout/layout.component';
import { PagesLayoutComponent } from './layouts/layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
 
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [loginGuard],
    canActivate: [loginGuard],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {path: 'pos', component: PagesLayoutComponent, loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule), canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
