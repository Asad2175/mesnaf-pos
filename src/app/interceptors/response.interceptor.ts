import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => {
          return event;
        },
        error: error => {
          console.log('error', error);
          if (error instanceof HttpErrorResponse && (error.status == 401)) {
            console.log('Hello');
            this.authService.logout();
          }
        },
      })
    );
  }
}
