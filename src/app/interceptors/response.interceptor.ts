import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { NavigationHelperService } from '../services/navigation-helper/navigation-helper.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private readonly localStorage: LocalStorageService,
    private readonly navigationService: NavigationHelperService,
    private readonly snackbar: SnackbarService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => {
          return event;
        },
        error: error => {
          if (error instanceof HttpErrorResponse && (error.status == 401)) {
            this.snackbar.open('انتهت الجلسة');
            this.localStorage.remove('access_token', 'refresh_token', 'loginDetails', 'machineDetails', 'name', 'registrationNo', 'branchName', 'otp');
            this.navigationService.navigateTo('/');
          }
        },
      })
    );
  }
}
