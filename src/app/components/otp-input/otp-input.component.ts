import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpiryHMSFormat } from '../../helper/expiry-hms.interface';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../services/loader/loader.service';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss']
})
export class OtpInputComponent {
  @Input() public timer!: ExpiryHMSFormat;
  @Input() public error!: string;
  @Output() public otp: EventEmitter<string> = new EventEmitter();
  @Output() public submit: EventEmitter<boolean> = new EventEmitter();
  public otpNumber = '';

  public constructor(private readonly authService: AuthService,
    private readonly loaderService: LoaderService,
    private readonly navigationHelperService: NavigationHelperService,
    private readonly localStorage: LocalStorageService
  ) {}

  public handleOtpChange(otpValue: string) {
    this.otpNumber = otpValue;
    if (otpValue.length === 4) {
      this.otp.emit(otpValue);
    }
  }

  public submitOtp(): void {
    this.submit.emit(true);
  }

  public timeExpired(event: boolean) {
    if (event) {
      this.logout();
    }
  }

  public logout(): void {
    this.authService.logout()
  }
}
