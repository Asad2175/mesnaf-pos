import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared.module';
import { BoxesComponent } from './boxes/boxes.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    DashboardRoutes
  ],
  declarations: [DashboardComponent, BoxesComponent]
})
export class DashboardModule { }
