import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LoaderService } from '../../services/loader/loader.service';
import { MachineSyncService } from '../../services/machine-sync/machine-sync.service';
import { MachineSync } from './machine-sync';
import { finalize, tap } from 'rxjs';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutModalComponent } from '../../components/logoutModal/logoutModal.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  machineDetails!: MachineSync;

  constructor(private readonly localStorage: LocalStorageService,
    private readonly loaderService: LoaderService,
    private readonly machineSyncService: MachineSyncService,
    private readonly navigationHelperService: NavigationHelperService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService
  ) { 
    this.getMachineSyncDetails();
  }

  public getMachineSyncDetails(): void {
    this.loaderService.start();
    this.machineSyncService.getMachineSyncDetails().pipe(
      tap((machine: MachineSync) => {
        this.machineDetails = machine;
        this.localStorage.add('branchName', this.machineDetails.branchName);
        this.localStorage.add('name', this.machineDetails.name);
        this.localStorage.add('registrationNo', this.machineDetails.registrationNo);
      }),
      finalize(() => this.loaderService.end())
    ).subscribe();
  }

  public clickLogout(): void {
    this.dialog.open(LogoutModalComponent)
  }

  public logout(): void {
    this.authService.logout(false);
  }

  private removeLocalStorageData(): void {
    this.localStorage.remove('access_token', 'refresh_token', 'loginDetails', 'machineDetails', 'name', 'registrationNo', 'branchName');
  }

}
