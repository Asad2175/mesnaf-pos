import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { Purchase } from '../../pages/purchase/purchaseItem';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() public data!: Purchase;
  @Input() public canShowInvoice = true;
  @Output() public goInvoiceScreen: EventEmitter<string> = new EventEmitter();

  constructor(private readonly navigationService: NavigationHelperService) {}

  public goToDashboard(): void {
    this.navigationService.navigateTo('/');
  }

  public gotoInvoiceScreen(): void {
    this.goInvoiceScreen.emit();
  }

}
