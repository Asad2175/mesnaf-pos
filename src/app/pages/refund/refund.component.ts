import { Component } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { RefundService } from '../../services/refund/refund.service';
import { LoaderService } from '../../services/loader/loader.service';
import { RefundOne } from './refundOne';
import { VerifyRefund } from './verifyRefund';
import { Purchase } from '../purchase/purchaseItem';
import { Print } from '../../services/print/print.interface';
import { PrintService } from '../../services/print/print.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent {
  public step = 1;
  private transactionNumber!: number;
  private otp!: number;
  private refundAmount!: string;
  public errorMessage!: string;
  public verifyStepOne!: RefundOne;
  public purchaseRes!: Purchase;
  
  constructor(private readonly navigationHelperService: NavigationHelperService,
    private readonly refundService: RefundService,
    private readonly loaderService: LoaderService,
    private readonly printService: PrintService
  ) { }

  public goBack(): void { 
    if (this.step === 1) {
      this.navigationHelperService.navigateTo('/');
      return;
    }
    this.step--;
  }

  public next(): void {
    this.step++;
  }

  public validateTransactionNo(event: number): void {
    this.transactionNumber = event
    this.VerifyTransactionId();
  }

  public validateOtp(event: number): void {
    this.otp = event
    this.VerifyRefund();
  }

  public validateAmount(event: string): void {
    this.refundAmount = event;
    this.step++;
  }

  public maskNumber(number: string | number): string {
    const numStr = number.toString();
    return numStr.slice(-4).padStart(numStr.length, '*');
  }

  public print(): void {
    const data = {
      cardNo: this.purchaseRes.cardNo ?? '',
      purchaseTransId: Number(this.purchaseRes.transId),
      purchaseAmount: String(this.purchaseRes.amount),
      purchaseStatus: this.purchaseRes.status ? 'SUCCESS' : 'REJECTED',
      charityNumber: Number(this.purchaseRes.charityNo),
      charityName: this.purchaseRes.charityName ?? '',
      approvedRejectedDateTime: this.purchaseRes.startTransDate,
      refund: true
    } as Print;
  
    this.printService.printData(data);
  }

  private VerifyTransactionId(): void {
    this.errorMessage = '';
    this.loaderService.start();
    this.refundService.redundStepOne(this.transactionNumber.toString()).subscribe({
      next: (res: RefundOne) => {
        this.verifyStepOne = res;
        this.step++;  
        this.loaderService.end();
      }, 
      error: (err) => {
        this.errorMessage = err.error.message;
        this.loaderService.end();
      }
    })
  }

  private VerifyRefund(): void {
    this.errorMessage = '';
    this.loaderService.start();
    this.refundService.refundStepTwo(this.getRefund()).subscribe({
      next: (res: any) => {
        this.purchaseRes = new Purchase(res.data.amount.toFixed(2), res.data.refundTransStatus === 'SUCCESS' ? true : false, res.data.message ?? '', res.data.transId, '', '', res.data.cardNo, res.data.transDateTime);
        this.step++;
        this.loaderService.end();
      }, 
      error: (err) => {
        this.errorMessage = err.error.message;
        this.loaderService.end();
      }
    })
  }

  private getRefund(): VerifyRefund {
    return new VerifyRefund(
      this.verifyStepOne.transId.toString(),
      this.otp.toString(),
      this.verifyStepOne.amount,
      this.refundAmount
    )
  }



}
