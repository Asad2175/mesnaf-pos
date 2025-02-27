import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  public step = 1;

  constructor(private readonly navigationHelperService: NavigationHelperService) { }

  ngOnInit() {
  }

  back(): void {
    if (this.step === 1) {
      this.navigationHelperService.navigateTo('pos');
    } else {
      this.step--;
    }
  }

  public next(): void {
    this.step++;
  }

}
