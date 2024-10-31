import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css',
})
export class AuthCallbackComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private route: Router
  ) {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (token) localStorage.setItem('auth_token', token);
    this.userAuthService.refreshUserInfo();
    this.route.navigate(['/userLanding']);
  }
}
