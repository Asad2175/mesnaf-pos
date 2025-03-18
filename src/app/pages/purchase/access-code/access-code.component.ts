import { Component } from '@angular/core';
import { NavigationHelperService } from '../../../services/navigation-helper/navigation-helper.service';
import { AccessCodeService } from '../../../services/access-code/access-code.service';
import { LoaderService } from '../../../services/loader/loader.service';
import { AccessCode } from './access-code';
import { Purchase } from '../purchaseItem';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { Print } from '../../../services/print/print.interface';
import { PrintService } from '../../../services/print/print.service';

@Component({
  selector: 'app-access-code',
  templateUrl: './access-code.component.html'
})
export class AccessCodeComponent {
  public step = 1;
  private amount!: string;
  private accessCode!: number;
  private picCode!: number;
  public purchaseRes!: Purchase;
  public incorrectCoupenError: string = '';

  public constructor(private readonly accessCodeService: AccessCodeService,
    private readonly navigationHelperService: NavigationHelperService,
    private readonly loaderService: LoaderService,
    private readonly invoiceService: InvoiceService,
    private readonly printService: PrintService
  ) { }

  public goBack(): void {
    if (this.step === 1) {
      this.navigationHelperService.navigateTo('/');
      return;
    }
    this.step--;
  }

  public validateAmount(value: string): void {
    this.amount = value;
    this.step++;
  }

  public validateAccessCode(value: number): void {
    this.accessCode = value;
    this.step++;
  }

  public validatePicCode(value: number): void {
    this.picCode = value;
    this.submit();
  }

  public enterInvoice(): void {
    this.step = 5;
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
  
    } as Print;
  
    this.printService.printData(data);
  }

  private submit(): void {
    this.loaderService.start();
    this.accessCodeService.save(this.getPurchase())
    .subscribe({
      next: (res: Purchase) => {
        this.purchaseRes = res;
        this.step = 4;  
        this.loaderService.end();
      },
      error: (err) => {
        this.purchaseRes = err.error.data;
        this.step = 4;
        this.loaderService.end();
      }
    })
  }

  public validateInvoice(invoiceNo: number): void {
    this.incorrectCoupenError = '';
    this.loaderService.start();
    this.invoiceService.update(Number(this.purchaseRes.transId), invoiceNo.toString())
    .subscribe({
      next: () => {
        this.navigationHelperService.navigateTo('/');
        this.loaderService.end();
      },
      error: (err) => {
        this.loaderService.end();
        this.incorrectCoupenError = err.error.message;
      }
    })
  }

  public getPurchase(): AccessCode {
    return new AccessCode(
      null,
      this.picCode.toString(),
      parseFloat(this.amount),
      String(this.accessCode).length === 6 ? 2 : 3,
      String(this.accessCode)
    )
  }

}
