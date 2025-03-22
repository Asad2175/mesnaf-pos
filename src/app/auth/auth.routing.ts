import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', redirectTo: ''},
  {path: 'otp', component: OtpComponent},
];

export const AuthRoutes = RouterModule.forChild(routes);
