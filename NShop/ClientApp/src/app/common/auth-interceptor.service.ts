import { Injectable, NgZone } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
    private router: Router,
    private _ngZone: NgZone) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('AuthInterceptor. interceptor called.');
    // Get the auth token from the service.
    const authToken = this.auth.accessToken;
    if (!authToken) {
      this._ngZone.run(() => {
        this.router.navigate(['login']);
      });
    }
    console.log('AuthInterceptor. AuthToken is:' + authToken);

    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}

