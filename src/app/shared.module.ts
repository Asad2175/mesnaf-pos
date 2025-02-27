import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnPrimaryComponent } from './components/btn-primary/btn-primary.component';
import { InputComponent } from './components/input/input.component';
import { MaterialModule } from './material.module';
import { OtpInputComponent } from './components/otp-input/otp-input.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ErrorComponent } from './components/error/error.component';
import { NavigationHelperService } from './services/navigation-helper/navigation-helper.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from './components/timer/timer.component';
import { InputFontSwitcherDirective } from './directives/input-font-switcher.directive';
import { FontSwitcherDirective } from './directives/font-switcher.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthService } from './services/auth/auth.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { NumberKeyboardComponent } from './components/number-keyboard/number-keyboard.component';
import { BackComponent } from './components/back/back.component';
import { PurchaseInputComponent } from './components/purchase-input/purchase-input.component';
import { AmountComponent } from './components/amount/amount.component';
import { DecimalInputDirective } from './directives/decimal-input.directive';
import { DecimalFormatService } from './services/decimal-formatter/decimal-formatter.service';
import { StatusComponent } from './components/status/status.component';

const COMPONENTS = [
  BtnPrimaryComponent, 
  InputComponent, 
  OtpInputComponent,
  ErrorComponent, 
  TimerComponent, 
  LoaderComponent,
  NumberKeyboardComponent,
  BackComponent,
  PurchaseInputComponent,
  AmountComponent,
  StatusComponent
];

const DIRECTIVES = [
  InputFontSwitcherDirective,
  FontSwitcherDirective,
  DecimalInputDirective
];

const SERVICES = [
  NavigationHelperService,
  AuthService,
  LocalStorageService,
  DecimalFormatService
]

const MODULES = [
  ReactiveFormsModule,
  CommonModule, 
  MaterialModule, 
  NgOtpInputModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
  FormsModule
]

@NgModule({
  imports: [MODULES],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES, ReactiveFormsModule, FormsModule],
  providers: [...SERVICES]
})
export class SharedModule { }
