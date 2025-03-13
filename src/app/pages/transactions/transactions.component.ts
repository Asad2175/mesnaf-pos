import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { Transactions } from './transactions';
import { LoaderService } from '../../services/loader/loader.service';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { PrintService } from '../../services/print/print.service';
import { Print } from '../../services/print/print.interface';

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
    private readonly invoiceService: InvoiceService,
    private printService: PrintService
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

  public print(transaction: Transactions): void {
    const data = {
      cardNo: transaction.cardNo,
      purchaseTransId: transaction.transId,
      purchaseAmount: transaction.amount,
      purchaseStatus: transaction.purchaseTransStatus
    } as Print;
  
    this.printService.printData(data);

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
