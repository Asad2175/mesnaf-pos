import { Component, Input, OnInit } from '@angular/core';
import { PurchaseItem } from '../../pages/purchase/purchaseItem';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input() public data!: PurchaseItem;
  constructor(private readonly navigationService: NavigationHelperService) { }

  ngOnInit() {
  }

  public goToDashboard(): void {
    this.navigationService.navigateTo('/');
  }

}
