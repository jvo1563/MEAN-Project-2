import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent {
  constructor(private activatedRoute: ActivatedRoute, private userAuthService: UserAuthService,
    private route: Router
  ){
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    const decoded: any = jwtDecode(token || '');
    const user = new UserInfo(0, '', '', '');
    user.userId = decoded.sub;
    user.username = decoded.email;
    user.userRole = decoded.role;
    user.userToken = token || '';
    this.userAuthService.updateUserInfo(user);
    this.route.navigate(['/userLanding']);
  }
}
