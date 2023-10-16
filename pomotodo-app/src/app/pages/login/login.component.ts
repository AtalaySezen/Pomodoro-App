import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  token = localStorage.getItem('token');

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    console.log(this.token);
    this.checkUserLogged();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }


  signIn() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    this.fireAuth.signInWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user; 
      const uid = user.uid; 
      
      localStorage.setItem('userUid',uid); 
      localStorage.setItem('token', 'true'); 
      this.router.navigate(['/home']);
    }, err => {
      this.router.navigate(['/login']);
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
