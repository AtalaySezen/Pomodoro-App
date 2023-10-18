import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fireAuth: AngularFireAuth, private authService: AuthService, private router: Router) {
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
      this.authService.setLocalStorage('userUid', uid);
      this.authService.setLocalStorage('token', 'true');
      this.router.navigate(['/home']);
    }, err => {
      this.router.navigate(['/login']);
      console.log(err);
    })

  }

  checkUserLogged() {
    if (this.authService.tokenInfo) {
      this.router.navigate(['/home']);
    } else {
      return;
    }
  }





}
