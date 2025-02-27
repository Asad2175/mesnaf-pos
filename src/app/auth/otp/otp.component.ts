import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { LoginOverviewService } from '../login/login-overview.service';
import { AssertionUtils } from '../../helper/assertion-utils';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { AuthService } from '../../services/auth/auth.service';
import { Otp } from './otp.interface';
import { verifyOtp } from './verify-otp.interface';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public userEnteredOtp = '';
  private branchUserName= '';
  public error = '';
  public otpDetails!: Otp;

  constructor(private readonly navigationHelperService: NavigationHelperService,
    private readonly loginOverviewService: LoginOverviewService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.getLoginDetails();
    this.generateOtp();
  }

  public back() {
    this.navigationHelperService.back('/login');
  }

  public getOtpValue(event: string) {
    this.userEnteredOtp = event;
  }

  private getLoginDetails(): void {
    const loginDetails = this.loginOverviewService.getData();
    if (!AssertionUtils.isNullOrUndefined(loginDetails)) {
      this.branchUserName = this.loginOverviewService.getUsername();
    } else {
      this.navigationHelperService.navigateTo('/login');
    }
  }

  public generateOtp() {
    this.loaderService.start();
    this.authService.generateOtp(this.branchUserName, this.loginOverviewService.getData().access_token).subscribe({
      next: (res: Otp) => {
        this.otpDetails = res;
        this.loaderService.end();
      }, 
      error: (err) => {
        this.error = err.error.message;
        this.loaderService.end();
      },
    })
  }

  public verifyOtp() {
    this.loaderService.start();
    if (this.userEnteredOtp !== this.otpDetails.otpNo) {
      this.error = 'The OTP you entered is incorrect.';
      this.loaderService.end();
      return;
    }
    this.authService.verifyOtp(this.branchUserName, this.userEnteredOtp, this.loginOverviewService.getData().access_token).subscribe({
      next: (verify: verifyOtp) => {
        if (verify.status) {
          this.localStorageService.add('access_token', this.loginOverviewService.getData().access_token);
          this.localStorageService.add('refresh_token', this.loginOverviewService.getData().refresh_token);
          this.navigationHelperService.navigateTo('/pos');
        } else {
          this.error = verify.resultMessage;
        }
        this.loaderService.end();
      }, 
      error: (err) => {
        this.error = err.error.message;
        this.loaderService.end();
      },
    })
  }

}
