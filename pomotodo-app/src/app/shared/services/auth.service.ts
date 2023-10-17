import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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














}
