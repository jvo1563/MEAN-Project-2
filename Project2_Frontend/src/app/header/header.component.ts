import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: UserInfo = new UserInfo();

  constructor(private userAuthService: UserAuthService, private route: Router) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    // Remove token from local storage
    localStorage.removeItem('auth_token');
    // this.userAuthService.updateUserInfo();
    this.userAuthService.refreshUserInfo();
    // Redirect to home page with router
    this.route.navigate(['/']);
  }
}
