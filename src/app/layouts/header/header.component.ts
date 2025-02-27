import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LoaderService } from '../../services/loader/loader.service';
import { MachineSyncService } from '../../services/machine-sync/machine-sync.service';
import { MachineSync } from './machine-sync';
import { finalize, tap } from 'rxjs';
import { NavigationHelperService } from '../../services/navigation-helper/navigation-helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  machineDetails!: MachineSync | null;

  constructor(private readonly localStorage: LocalStorageService,
    private readonly loaderService: LoaderService,
    private readonly machineSyncService: MachineSyncService,
    private readonly navigationHelperService: NavigationHelperService
  ) { 
    this.getMachineSyncDetails();
  }

  public getMachineSyncDetails(): void {
    this.loaderService.start();
    this.machineSyncService.getMachineSyncDetails().pipe(
      tap((machine: MachineSync) => {
        this.machineDetails = machine;
      }),
      finalize(() => this.loaderService.end())
    ).subscribe();
  }

  public logout(): void {
    this.loaderService.start();
    this.machineSyncService.getMachineSyncDetails().pipe(
      tap((machine: MachineSync) => {
        this.machineDetails = machine;
        this.removeLocalStorageData();
      }),
      finalize(() => {
        this.loaderService.end();
        this.navigationHelperService.navigateTo('/');
      })
    ).subscribe();
  }

  private removeLocalStorageData(): void {
    this.localStorage.remove('access_token', 'refresh_token');
  }

}
