import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { AuthService } from '../../services/auth/auth.service';
import { Otp } from './otp.interface';
import { verifyOtp } from './verify-otp.interface';
import { LoaderService } from '../../services/loader/loader.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public userEnteredOtp = '';
  public error = '';
  public otpDetails!: Otp;
  private branchUserName = '';
  private navigateToLoginCheck = false;

  constructor(private readonly navigationHelperService: NavigationHelperService,
    private readonly authService: AuthService,
    private readonly loaderService: LoaderService,
    private readonly localStorage: LocalStorageService
  ) { }

  public ngOnInit(): void {
    this.branchUserName = this.localStorage.get('username') ?? '';
    this.localStorage.add('otp', 0);
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isPageRefresh = navEntries.length && navEntries[0].type === 'reload';
    console.log('isPageRefresh', isPageRefresh);
    console.log('this.navigateToLoginCheck', this.navigateToLoginCheck);
    if (isPageRefresh && this.navigateToLoginCheck) {
      this.authService.logout();
    }
    this.navigateToLoginCheck = true;
    this.generateOtp();
  }

  public back() {
    this.authService.logout();
  }

  public maskNumber(): string {
    const numStr = this.otpDetails?.mobile.toString();
    return numStr.slice(-4).padStart(numStr.length, '*');
  }

  public getOtpValue(event: string) {
    this.userEnteredOtp = event;
    this.verifyOtp();
  }

  public generateOtp() {
    this.loaderService.start();
    this.authService.generateOtp(this.branchUserName).subscribe({
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
    this.navigateToLoginCheck = false;
    this.loaderService.start();
    this.authService.verifyOtp(this.branchUserName, this.userEnteredOtp).subscribe({
      next: (verify: verifyOtp) => {
        if (verify.status) {
          this.navigateToLoginCheck = false;
          this.localStorage.add('otp', 1);
          this.navigationHelperService.navigateTo('/pos');
        } else {
          this.navigateToLoginCheck = true;
          this.error = verify.resultMessage;
        }
        this.loaderService.end();
      }, 
      error: (err) => {
        this.navigateToLoginCheck = true;
        this.error = err.error.message;
        this.loaderService.end();
      },
    })
  }

}
