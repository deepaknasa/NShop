import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  logoutUser: Subscription;
  

  constructor(private loginSvc: LoginService) {
    this.logoutUser = this.loginSvc.SubscribeLogoutUser.subscribe((data) => {
      if (data) {
        console.log('google component - onInit');
        this.logoutGoogleAccount();
      }
    });
  }

  public logoutGoogleAccount() {
    console.log('google logout is called.');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('user signed out');
    });
    auth2.disconnect();
  }
}
