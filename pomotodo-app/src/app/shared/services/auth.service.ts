import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private Router: Router) { }

  get tokenInfo() {
    if (localStorage.getItem(`token`) != null) {
      return localStorage.getItem(`token`) || '';
    } else {
      return null;
    }
  }


  get userUid() {
    if (localStorage.getItem(`userUid`) != null) {
      return localStorage.getItem(`userUid`) || '';
    } else {
      return null;
    }
  }

  setLocalStorage(localStorageKey: string, localStorageValue: any) {
    return localStorage.setItem(localStorageKey, localStorageValue);
  }


  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userUid');
    this.Router.navigate(['login']);
  }











}
