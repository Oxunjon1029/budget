import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarserviceService {
  constructor(private snackbarService: MatSnackBar) {}
  openSnackbar(message: string): void {
    this.snackbarService.open(message, 'Close');
  }
}
