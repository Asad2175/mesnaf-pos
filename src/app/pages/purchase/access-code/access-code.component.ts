import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../../services/navigation-helper/navigation-helper.service';
import { Purchase } from '../purchase';
import { AccessCodeService } from '../../../services/access-code/access-code.service';
import { PurchaseItem } from '../purchaseItem';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss']
})
export class AccessCodeComponent implements OnInit {
  public step = 1;
  private amount!: string;
  private accessCode!: number;
  private picCode!: number;
  public purchaseRes!: PurchaseItem;
  public constructor(private readonly accessCodeService: AccessCodeService,
    private readonly navigationHelperService: NavigationHelperService,
    private readonly loaderService: LoaderService
  ) { }

  public ngOnInit() {
  }

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

  private submit(): void {
    this.loaderService.start();
    this.accessCodeService.save(this.getPurchase())
    .subscribe({
      next: (res: PurchaseItem) => {
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

  public getPurchase(): Purchase {
    return new Purchase(
      null,
      this.picCode.toString(),
      parseFloat(this.amount),
      String(this.accessCode).length === 6 ? 2 : 3,
      String(this.accessCode)
    )
  }

}
