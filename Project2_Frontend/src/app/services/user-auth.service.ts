import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  userAuthSubject = new BehaviorSubject<UserInfo>(new UserInfo(0, '', '', ''))

  userAuthObservable = this.userAuthSubject.asObservable();

  updateUserInfo(diffUserInfo: UserInfo){
    this.userAuthSubject.next(diffUserInfo);
  }
}
