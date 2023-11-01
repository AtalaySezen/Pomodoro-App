import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  pomotodoMinute: number;
  form: FormGroup;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) {
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
        console.log("güncellendi");
      })
      .catch((error) => {
        console.error('hata oluştu: ' + error);
      });

  }


  updatePomotodoMinute() {
    const pomodotoData = {
      pomotodoTime: this.pomotodoMinute,
    };

    this.firebaseService
      .UpdateFirebaseData('/users/', this.authService.userUid, pomodotoData)
      .then(() => {
        console.log("güncellendi");
      })
      .catch((error) => {
        console.error('hata oluştu: ' + error);
      });

  }


}














