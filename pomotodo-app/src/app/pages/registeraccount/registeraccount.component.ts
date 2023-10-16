import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-registeraccount',
  templateUrl: './registeraccount.component.html',
  styleUrls: ['./registeraccount.component.scss']
})
export class RegisteraccountComponent {
  loginForm: FormGroup;
  token = localStorage.getItem('token');

  constructor(private fireAuth: AngularFireAuth, private router: Router, private firebaseService:FirebaseService) {
    this.checkUserLogged();

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })

  }


  registerAccount() {
    let email = this.loginForm.get('email')?.value;
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;

    this.fireAuth.createUserWithEmailAndPassword(email,password).then(userCredential=>{
      const user = userCredential.user; 
      const uid = user.uid; 

      let data = {
        email:email,
        pomotodoTime:25,
        pomotodos : [''],
        todos:[''],
        username:username
      }
      this.firebaseService.addDataWithCustomUid(uid,data);
      this.router.navigate(['/login']);

    },err=>{
      console.log(err);
    })

  }
  
  checkUserLogged(){
    if (this.token) {
      this.router.navigate(['/home']);
    } else {
      return;
    }
  }





}
