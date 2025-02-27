import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutes } from './purchase.routing';
import { CoupenComponent } from './coupen/coupen.component';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared.module';
import { AccessCodeComponent } from './access-code/access-code.component';
import { CoupenDetailsComponent } from './coupen/details/details.component';

@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutes,
    MaterialModule,
    SharedModule
  ],
  declarations: [CoupenComponent, AccessCodeComponent, CoupenDetailsComponent]
})
export class PurchaseModule { }
