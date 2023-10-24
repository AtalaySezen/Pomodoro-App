import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  pomotodoMinute: number;
  form: FormGroup;

  constructor(private firebaseService: FirebaseService) {

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })

  }

  updateUsername() {
    let username = this.form.get('username')?.value;
    console.log(username);

  }


  selectPomotodoMinute() {
    console.log(this.pomotodoMinute);
  }














}
