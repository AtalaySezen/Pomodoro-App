import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private firebaseService: FirebaseService, private authService: AuthService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');

    if (token == 'true') {
      return true;
    } else {
      this.authService.Logout();
      this.router.navigate(['login']);
      return false;
    }


  }

}