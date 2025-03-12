import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyReportComponent } from './monthly-report.component';
import { MontlyReportRoutes } from './montly-report.routing';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    MontlyReportRoutes,
    MaterialModule,
    SharedModule
  ],
  declarations: [MonthlyReportComponent]
})
export class MonthlyReportModule { }
