import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { Transactions } from './transactions';
import { LoaderService } from '../../services/loader/loader.service';
import { InvoiceService } from '../../services/invoice/invoice.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public transactionsRes!: Transactions[];
  public step = 1;
  public incorrectCoupenError: string = '';
  public transactionId!: number;

  constructor(private readonly navigationHelperService: NavigationHelperService,
    private readonly transactionsService: TransactionsService,
    private readonly loaderService: LoaderService,
    private readonly invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.transactions();
  }

  public goBack(): void {
    if (this.step === 1) {
      this.navigationHelperService.navigateTo('/');
    } else {
      this.step--;
    }
    
  }

  public gotoInvoiceScreen(transId: number): void {
    this.transactionId = transId;
    this.step = 2;
  }

  public validateInvoice(invoiceNo: number): void {
    this.incorrectCoupenError = '';
    this.loaderService.start();
    this.invoiceService.update(Number(this.transactionId), invoiceNo.toString())
    .subscribe({
      next: () => {
        this.navigationHelperService.navigateTo('/pos/transactions');
        this.loaderService.end();
      },
      error: (err) => {
        this.loaderService.end();
        this.incorrectCoupenError = err.error.message;
      }
    })
  }

  private transactions(): void {
    this.loaderService.start();
    this.transactionsService.getTransactions().subscribe({
      next: (res: Transactions[]) => {
        this.transactionsRes = res;
        this.loaderService.end();
      },
      error: (err) => {
        this.loaderService.end();
      }
    })
  }

}
