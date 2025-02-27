import { Component, OnInit } from '@angular/core';
import { NavigationHelperService } from '../../../services/navigation-helper/navigation-helper.service';

@Component({
  selector: 'app-coupen',
  templateUrl: './coupen.component.html',
  styleUrls: ['./coupen.component.scss']
})
export class CoupenComponent implements OnInit {
  public step = 1;

  constructor(private readonly navigationHelperService: NavigationHelperService) { }

  public goBack(): void {
    if (this.step === 1) {
      this.navigationHelperService.navigateTo('/');
      return;
    }
    this.step--;
  }

  public validateCoupenNumber(value: number): void {
    this.step++;
  }

  validateCoupenDetails(): void {
    this.step++;
  }

  validatePinCode(value: number): void {
    this.step++;
  }

  ngOnInit() {
  }

}
