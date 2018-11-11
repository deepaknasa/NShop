import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../login.service';
import { Observable, Subscription } from 'rxjs';
import { createWiresService } from 'selenium-webdriver/firefox';
import { GoogleService } from './google.service';

declare const gapi: any;

@Component({
  selector: 'google-login',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements AfterViewInit {


  constructor(
    private loginSvc: LoginService,
    private googleSvc: GoogleService) {
    this.clientConfig = {
      client_id: '1062387037281-5hcmfdj6j5cmslebfkvol71hv9p2f8f8.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email'
    };
  }
  
  private clientConfig: any;
  private auth2: any;

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init(this.clientConfig);

      var contextualFunc = (function (googleUser) { this.onUserSignedIn(googleUser); }).bind(this);
      gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 200,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: contextualFunc,
        onfailure: this.onSignInFailure
      });
    });
  }
  public onSignInFailure(error: any) {
    console.log(error);
  }

  public onUserSignedIn(googleUser: any) {
    let profile = googleUser.getBasicProfile();

    let loggedInUser = <User>{
      email: profile.getEmail(),
      name: profile.getName(),
      profileImage: profile.getImageUrl(),
      token: googleUser.getAuthResponse().id_token
    };

    console.log('google user signed in. User: ' + JSON.stringify(loggedInUser));
    this.onGoogleLogIn(loggedInUser);
  }

  public onGoogleLogIn(loggedInUser: User) {
    this.loginSvc.onLogin(loggedInUser);
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
