import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  pomodoroMinute: number;
  form: FormGroup;

  constructor(private firebaseService: FirebaseService, private authService: AuthService, private snackbar: SnackbarService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  updateUsername() {
    let username = this.form.get('username')?.value;
    const userData = {
      username: username,
    };

    this.firebaseService
      .UpdateFirebaseData('/users/', this.authService.userUid, userData)
      .then(() => {
        this.snackbar.openSnackBar('Updated Successfully.', 'success', 'ok');
      })
      .catch((error) => {
        console.log(error);
        this.snackbar.openSnackBar('Error', 'error', 'ok');
      });
  }


  updatePomodoroMinute() {
    const pomodotoData = {
      pomotodoTime: this.pomodoroMinute,
    };

    this.firebaseService
      .UpdateFirebaseData('/users/', this.authService.userUid, pomodotoData)
      .then(() => {
        this.snackbar.openSnackBar('Updated Successfully.', 'success', 'ok');
      })
      .catch((error) => {
        console.log(error);
        this.snackbar.openSnackBar('Error', 'error', 'ok');
      });
  }
}














