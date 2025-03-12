import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutes } from './transactions.routing';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    TransactionsRoutes,
    MaterialModule,
    SharedModule
  ],
  declarations: [TransactionsComponent]
})
export class TransactionsModule { }
