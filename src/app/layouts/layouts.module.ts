import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesLayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared.module';
import { MaterialModule } from '../material.module';
import { MachineSyncService } from '../services/machine-sync/machine-sync.service';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    PagesLayoutComponent,
    HeaderComponent
  ],
  providers: [MachineSyncService]
})
export class LayoutsModule { }
