import { Component, Input } from '@angular/core';
import { PurchaseItem } from '../../pages/purchase/purchaseItem';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() public data!: PurchaseItem;
  constructor(private readonly navigationService: NavigationHelperService) { }

  public goToDashboard(): void {
    this.navigationService.navigateTo('/');
  }

}
