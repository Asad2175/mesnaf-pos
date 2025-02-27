import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpiryHMSFormat } from '../../helper/expiry-hms.interface';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss']
})
export class OtpInputComponent implements OnInit {
  @Input() public timer!: ExpiryHMSFormat;
  @Input() public error!: string;
  @Output() public otp: EventEmitter<string> = new EventEmitter();
  @Output() public resend: EventEmitter<void> = new EventEmitter();
  @Output() public submit: EventEmitter<boolean> = new EventEmitter();
  public isTimeExpired = false;

  constructor() { }

  ngOnInit() {
  }

  public handleOtpChange(otpValue: string) {
    if (otpValue.length === 4) {
      this.otp.emit(otpValue);
    }
  }

  public submitOtp(): void {
    this.submit.emit(true);
  }

  public timeExpired(event: boolean) {
    if (event) {
      this.isTimeExpired = true;
    }
  }

  public resendOtp(): void {
    this.resend.emit();
  }
}
