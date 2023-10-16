import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private firebaseService: FirebaseService) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');

    if (token == 'true') {
      return true;
    } else {
      this.firebaseService.Logout();
      this.router.navigate(['login']);
      return false;
    }


  }

}