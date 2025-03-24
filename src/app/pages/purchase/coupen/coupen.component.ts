import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../../services/navigation-helper/navigation-helper.service';
import { CoupenService } from '../../../services/coupen/coupen.service';
import { LoaderService } from '../../../services/loader/loader.service';
import { Purchase } from '../purchaseItem';
import { Coupen } from './Coupen';
import { InvoiceService } from '../../../services/invoice/invoice.service';
import { Print } from '../../../services/print/print.interface';
import { PrintService } from '../../../services/print/print.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-coupen',
  templateUrl: './coupen.component.html',
  styleUrls: ['./coupen.component.scss']
})
export class CoupenComponent implements OnInit {
  public step = 1;
  public coupenNumber!: number;
  public incorrectCoupenError: string = '';
  public pincode!: number;
  public purchaseRes!: Purchase;
  public draftPurchaseRes!: Purchase;


  constructor(private readonly navigationHelperService: NavigationHelperService,
    private readonly coupenService: CoupenService,
    private readonly loaderService: LoaderService,
    private readonly invoiceService: InvoiceService,
    private readonly printService: PrintService,
    private readonly matSnackBar: SnackbarService
  ) {}

  public goBack(): void {
    if (this.step === 1) {
      this.navigationHelperService.navigateTo('/');
      return;
    }
    this.step--;
  }

  public validateCoupenNumber(value: number): void {
    this.coupenNumber = value;
    this.verifyCoupenNumber();
  }

  public validateCoupenDetails(): void {
    this.step++;
  }

  public validatePinCode(value: number): void {
    this.pincode = value;
    this.submit();
  }

  ngOnInit() {
  }

  public validateInvoice(invoiceNo: number): void {
    this.incorrectCoupenError = '';
    this.loaderService.start();
    this.invoiceService.update(Number(this.purchaseRes.transId), invoiceNo.toString())
    .subscribe({
      next: (res: any) => {
        this.navigationHelperService.navigateTo('/');
        this.matSnackBar.open(res.message);
        this.loaderService.end();
      },
      error: (err) => {
        this.loaderService.end();
        this.incorrectCoupenError = err.error.message;
      }
    })
  }

  public gotoInvoiceScreen(): void {
    this.step = 5;
  }

  public print(isDraft: boolean): void {
    const res = isDraft ? this.draftPurchaseRes : this.purchaseRes
    const data = {
      cardNo: res.cardNo ?? '',
      purchaseTransId: Number(res.transId),
      purchaseAmount: String(res.amount),
      purchaseStatus: res.status ? 'SUCCESS' : 'REJECTED',
      charityNumber: Number(res.charityNo),
      charityName: res.charityName ?? '',
      approvedRejectedDateTime: res.startTransDate,
      itemList: res.itemList,
      message: res.message ?? ''
    } as Print;
  
    this.printService.printData(data);
  }

  private verifyCoupenNumber(): void {
    this.loaderService.start();
    this.incorrectCoupenError = '';
    this.coupenService.verifyCoupen(this.coupenNumber).subscribe({
      next: (res: Purchase) => {
        this.draftPurchaseRes = res;
        this.loaderService.end();
        this.step++;
      },
      error: (err) => {
        this.loaderService.end();
        this.incorrectCoupenError = err.error.message;
      }
    })
  }

  private submit(): void {
    this.loaderService.start();
    this.incorrectCoupenError = '';
    this.coupenService.submit(this.getCoupenResponse()).subscribe({
      next: (res: Purchase) => {
        this.purchaseRes = res;
        this.step = 4;
        this.loaderService.end();
      },
      error: (err) => {
        this.loaderService.end();
        this.incorrectCoupenError = err.error.message;
      }
    })
  }

  private getCoupenResponse(): Coupen {
    return new Coupen(
      this.coupenNumber.toString(),
      this.pincode.toString()
    )
  }

}
