import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedInUser: User;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginSvc: LoginService,
    private _ngZone: NgZone
  ) {
    console.log('auth.service - constructor.');
    this.loginSvc.SubscribeLoginUser.subscribe((user) => {
      console.log('auth.service - loginUser called.');
      this.login(user);
    });
  }

  login(user: User) {
    if (user.email !== '' && user.token !== '') {
      this.loggedInUser = user;
      console.log('auth.service - sufficient info to login user. calling loggedIn.next(true)');
      this.loggedIn.next(true);
      this._ngZone.run(() => {
        let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log('auth.service: redirect to return url: ' + returnUrl);
        this.router.navigateByUrl(returnUrl);
      });
    } else {
      console.log('auth.service - insufficient info to login user. So logging out.');
      this.logout();
    }
  }

  logout() {
    this._ngZone.run(() => {
      this.loggedIn.next(false);
      this.loginSvc.logoutCurrentUser();
      this.router.navigate(['/']);
    });
  }

  get accessToken(): string {
    if (this.loggedInUser) {
      return 'Bearer ' + this.loggedInUser.token;
    }
    return '';
  }
}
