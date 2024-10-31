import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

@Injectable()
export class CheckTokenInterceptor implements HttpInterceptor {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenExp = this.userAuthService.getTokenExp(); // Get 'exp' from service

    if (tokenExp && Date.now() >= tokenExp * 1000) {
      // Convert `exp` to milliseconds
      this.userAuthService.clearToken();
      this.router.navigate(['/']);
      return throwError(() => new Error('Token expired')); // Stop the request
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // In case the server responds with unauthorized
          this.userAuthService.clearToken();
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
  }
}
