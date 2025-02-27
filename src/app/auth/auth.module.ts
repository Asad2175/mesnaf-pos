import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { OtpComponent } from './otp/otp.component';
import { AuthRoutes } from './auth.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    AuthRoutes,
    FormsModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, LayoutComponent, OtpComponent]
})
export class AuthModule { }
