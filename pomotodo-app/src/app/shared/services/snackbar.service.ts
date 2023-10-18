import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, snackType?: any, action?: string) {
    const _snackType: any =
      snackType !== undefined ? snackType : 'Success';
    if (snackType == 'Success') {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: { message: message, snackType: _snackType }
      });
    } else {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 3500,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: { message: message, action: action, snackType: _snackType }
      });
    }

  }

  dismiss() {
    this.snackBar.dismiss();
  }


}
