import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  iconName: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackbar: SnackbarService) {
  }

  ngOnInit(): void {
    this.getIcon
  }

  get getIcon() {
    switch (this.data.snackType) {
      case 'success':
        this.iconName = 'done';
        return 'done';
      case 'error':
        this.iconName = 'error';
        return 'error';
      case 'warn':
        this.iconName = 'warning';
        return 'warning';
      case 'info':
        this.iconName = 'info';
        return 'info';
      default:
        return '';
    }
  }

  dismiss() {
    this.snackbar.dismiss();
  }



}