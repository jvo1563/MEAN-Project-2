import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private router: Router) {
    // Optional: Listen to storage events for multi-tab support
    window.addEventListener('storage', () => {
      this.userAuthSubject.next(this.getUserFromStorage());
      if (!localStorage.getItem('auth_token')) {
        this.router.navigate(['']);
      }
    });
  }

  userAuthSubject = new BehaviorSubject<UserInfo>(this.getUserFromStorage());

  userAuthObservable = this.userAuthSubject.asObservable();

  //update user info in this serivce and emit that change to observables
  updateUserInfo(diffUserInfo: UserInfo) {
    this.userAuthSubject.next(diffUserInfo);
  }

  refreshUserInfo() {
    this.userAuthSubject.next(this.getUserFromStorage());
  }

  //get when the token should expire
  getTokenExp() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.exp;
    }
    return null;
  }

  //for clearing out token data in user auth serivce
  clearToken() {
    localStorage.removeItem('auth_token');
    this.refreshUserInfo();
  }

  //get the user info from BE(which reaches out to google oauth)
  private getUserFromStorage(): UserInfo {
    const token = localStorage.getItem('auth_token');

    if (token) {
      const decoded: any = jwtDecode(token);
      const id: number = parseInt(decoded.sub) || 0;
      const username: string = decoded.email || '';
      const userRole: string = decoded.role || '';
      const userToken: string = token || '';
      const userFirstName: string = decoded.first_name || '';
      const userLastName: string = decoded.last_name || '';
      const userPicture: string = decoded.picture || '';
      return new UserInfo(
        id,
        username,
        userRole,
        userToken,
        userFirstName,
        userLastName,
        userPicture
      );
    }
    return new UserInfo();
  }
}
