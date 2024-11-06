import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';

//used to attach token to requests, that way BE can authenticate users
@Injectable()
export class TokenStaplerInterceptor implements HttpInterceptor {
  userToken: string = '';

  constructor(private userAuthService: UserAuthService) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.userToken = data.userToken;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const userToken = localStorage.getItem('auth_token');
    let newReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.userToken}`),
    });
    return next.handle(newReq);
  }
}
