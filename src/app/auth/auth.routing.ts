import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { loginGuard } from '../guards/login.guard';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivateChild: [loginGuard], canActivate: [loginGuard],},
  {path: 'login', redirectTo: ''},
  {path: 'otp', component: OtpComponent},
];

export const AuthRoutes = RouterModule.forChild(routes);
