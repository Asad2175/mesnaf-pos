import {Component} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mesnaf-pos';

  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private readonly loaderSerivce: LoaderService) {
    iconRegistry.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/logo.svg')
    );
    iconRegistry.addSvgIcon(
      'username',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/username.svg')
    );
    iconRegistry.addSvgIcon(
      'password',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/password.svg')
    );
    iconRegistry.addSvgIcon(
      'back',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/back.svg')
    );
    iconRegistry.addSvgIcon(
      'shop',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/shop.svg')
    );
    iconRegistry.addSvgIcon(
      'profile',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/profile.svg')
    );
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg')
    );
    iconRegistry.addSvgIcon(
      'settings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings.svg')
    );
    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg')
    );
    iconRegistry.addSvgIcon(
      'refund',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/refund.svg')
    );
    iconRegistry.addSvgIcon(
      'coupen',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/coupen.svg')
    );
    iconRegistry.addSvgIcon(
      'access',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/access.svg')
    );
    iconRegistry.addSvgIcon(
      'transactions',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/transactions.svg')
    );
    iconRegistry.addSvgIcon(
      'monthly',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/monthly.svg')
    );
    iconRegistry.addSvgIcon(
      'backspace',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/backspace.svg')
    );
    iconRegistry.addSvgIcon(
      'left-arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/left-arrow.svg')
    );
    iconRegistry.addSvgIcon(
      'status',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/status.svg')
    );
    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cancel.svg')
    );
    iconRegistry.addSvgIcon(
      'notes',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/notes.svg')
    );
    iconRegistry.addSvgIcon(
      'money',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/money.svg')
    );
  }

  public get getLoader(): boolean {
    return this.loaderSerivce.getLoader();
  }
}
