import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';
// import { jwtDecode } from "jwt-decode";
// import "core-js/stable/atob";

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
    const userName = this.activatedRoute.snapshot.queryParamMap.get('userName');
    // const decoded = jwtDecode(token || '');
    // console.log(decoded);
    const user = new UserInfo(0, '', '', '');
    user.userId = 4;
    user.username = userName || '';
    user.userRole = 'admin';
    user.userToken = token || '';
    this.userAuthService.updateUserInfo(user);
    this.route.navigate(['/userLanding']);
  }
}
