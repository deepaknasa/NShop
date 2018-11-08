import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class LoginService {
  private loginUser = new Subject<User>();
  private logoutUser = new BehaviorSubject<boolean>(false);
  constructor() { }

  get SubscribeLoginUser() {
    return this.loginUser.asObservable();
  }

  get SubscribeLogoutUser() {
    return this.logoutUser.asObservable();
  }

  onLogin(loggedInUser: User) {
    console.log('login.service - user logged in.');
    this.loginUser.next(loggedInUser);
  }

  logoutCurrentUser() {
    console.log('login.service - pre-logoutCurrentUser');
    this.logoutUser.next(true);
    console.log('login.service - post-logoutCurrentUser');
  }
}
