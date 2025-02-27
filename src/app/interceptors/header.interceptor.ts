import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from '../constants/endpoints';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(public readonly localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("oauth/token")) {
      request = request.clone({
        setHeaders: {
          'Authorization': END_POINTS.LoginAuth
        }
      })
    } else if (!request.url.includes('branches/sms/otp') && !request.url.includes('branches/sms/validate')) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.localStorage.get('access_token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    }
    return next.handle(request);
  }
}
