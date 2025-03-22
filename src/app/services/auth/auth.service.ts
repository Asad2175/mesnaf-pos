import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { END_POINTS } from '../../constants/endpoints';
import { API_URL } from '../../app.module';
import { FORM_DATA } from '../../helper/formData';
import { LoginForm } from '../../auth/login/login.form';
import { Login } from '../../auth/login/login.interface';
import { Otp } from '../../auth/otp/otp.interface';
import { BaseApiResponse } from '../../helper/base-api.interface';
import { verifyOtp } from '../../auth/otp/verify-otp.interface';
import { LoaderService } from '../loader/loader.service';
import { NavigationHelperService } from '../navigation-helper/navigation-helper.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private readonly httpClient: HttpClient,
  @Inject(API_URL) private backendUrl: string,
  private readonly loaderService: LoaderService,
  private readonly navigationHelperService: NavigationHelperService,
  private readonly localStorage: LocalStorageService
) {}

  public login(data: LoginForm): Observable<Login> {
    const formDataInstance = new FORM_DATA();
    const formattedData = formDataInstance.getFormData(data);
    return this.httpClient.post<Login>(this.backendUrl + END_POINTS.login, formattedData).pipe(map( res => res));
  }

  public generateOtp(branchUsername: string): Observable<Otp> {
    return this.httpClient.post<BaseApiResponse<Otp>>(this.backendUrl + END_POINTS.generateOtp, {branchUsername}).pipe(map( res => res.data));
  }

  public verifyOtp(branchUsername: string, reqOTPValue: string): Observable<verifyOtp> {
    return this.httpClient.post<BaseApiResponse<verifyOtp>>(this.backendUrl + END_POINTS.verifyOtp, {branchUsername, reqOTPValue}).pipe(map( res => res.data));
  }

  public logoutAPI(): Observable<void> {
    return this.httpClient.post<void>(this.backendUrl + END_POINTS.logout, {});
  }

  public logout(isLogin = true): void {
    this.loaderService.start();
    this.logoutAPI().subscribe({
      next: () => {
        this.loaderService.end();
        this.removeLocalStorageData(isLogin);
        this.navigationHelperService.navigateTo('/');
      }
    });
  }

  private removeLocalStorageData(isLogin: boolean): void {
    if (isLogin) {
      this.localStorage.remove('access_token', 'refresh_token', 'otp');
    } else {
      this.localStorage.remove('access_token', 'refresh_token', 'loginDetails', 'machineDetails', 'name', 'registrationNo', 'branchName', 'otp');
    }
  }
}
