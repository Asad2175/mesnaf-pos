import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  providers: [provideNativeDateAdapter()],
})
export class MaterialModule { }
