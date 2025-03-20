import {ChangeDetectorRef, Component} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'منصة مسناف للربط التقني';
  private svgIconsList: string[] = [
    'logo',
    'username',
    'password',
    'back',
    'shop',
    'profile',
    'home',
    'settings',
    'logout',
    'refund',
    'coupen',
    'access',
    'transactions',
    'monthly',
    'backspace',
    'left-arrow',
    'status',
    'cancel',
    'notes',
    'money',
    'print',
    'invoice'
  ] 

  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private readonly loaderSerivce: LoaderService,
    private readonly cdRef: ChangeDetectorRef) {
      this.svgIconsList.forEach((element: string) => {
        iconRegistry.addSvgIcon(
          element,
          sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${element}.svg`)
        );
      });
  }

  public get getLoader(): boolean {
    return this.loaderSerivce.getLoader();
  }
}
