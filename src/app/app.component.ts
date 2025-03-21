import {ChangeDetectorRef, Component} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from './services/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'منصة مسناف للربط التقني';
  public isLoading$?: Observable<boolean>;

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
        this.isLoading$ = this.loaderSerivce.getLoader(); // ✔ safer here
        iconRegistry.addSvgIcon(
          element,
          sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${element}.svg`)
        );
      });
  }
}
