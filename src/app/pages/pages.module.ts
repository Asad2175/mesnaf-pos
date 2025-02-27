import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing';
import { SharedModule } from '../shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { RefundModule } from './refund/refund.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutes,
    SharedModule,
    DashboardModule,
    LayoutsModule,
    RefundModule
  ],
  declarations: []
})
export class PagesModule { }
