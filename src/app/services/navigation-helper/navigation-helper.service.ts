import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationHelperService {

constructor(private readonly router: Router,
  private readonly location: Location
) { }

  public back(route?: string): void {
    if (route) {
      this.navigateTo(route);
    } else {
      this.location.back();
    }
  }

  public navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

}
