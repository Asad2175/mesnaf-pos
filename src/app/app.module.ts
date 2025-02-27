import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

export const API_URL = new InjectionToken<string>('apiUrl');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    SharedModule,
    AuthModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: API_URL, useValue: 'https://mesnaf.co' },
    {
      provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi:true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
