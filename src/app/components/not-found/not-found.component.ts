import { Component } from '@angular/core';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  public constructor(private readonly navigationHelperService: NavigationHelperService) {}

  public goBack(): void {
    this.navigationHelperService.back();
  }
}
