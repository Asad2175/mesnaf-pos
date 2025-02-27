import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundComponent } from './refund.component';
import { RefundRoutes } from './refund.routing';
import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    RefundRoutes,
    SharedModule,
    MaterialModule
  ],
  declarations: [RefundComponent]
})
export class RefundModule { }
