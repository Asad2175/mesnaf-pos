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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private readonly httpClient: HttpClient,
  @Inject(API_URL) private backendUrl: string
) {}

  public login(data: LoginForm): Observable<Login> {
    const formDataInstance = new FORM_DATA();
    const formattedData = formDataInstance.getFormData(data);
    return this.httpClient.post<Login>(this.backendUrl + END_POINTS.login, formattedData).pipe(map( res => res));
  }

  public generateOtp(branchUsername: string, Authorization: string): Observable<Otp> {
    return this.httpClient.post<BaseApiResponse<Otp>>(this.backendUrl + END_POINTS.generateOtp, {branchUsername},
      {headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${Authorization}`,
          'Content-Type': 'application/json'
        }
      )}
    ).pipe(map( res => res.data));
  }

  public verifyOtp(branchUsername: string, reqOTPValue: string, Authorization: string): Observable<verifyOtp> {
    return this.httpClient.post<BaseApiResponse<verifyOtp>>(this.backendUrl + END_POINTS.verifyOtp, {branchUsername, reqOTPValue},
      {headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${Authorization}`,
          'Content-Type': 'application/json'
        }
      )}
    ).pipe(map( res => res.data));
  }

  public logout(): Observable<void> {
    return this.httpClient.post<void>(this.backendUrl + END_POINTS.logout, {});
  }
}
