import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

constructor(private readonly matSnackBar: MatSnackBar) { }

 public open(message: string) {
  this.matSnackBar.open(message, 'x', {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 5000
  })
 }
}
