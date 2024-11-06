import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { RouterLink } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: UserInfo = new UserInfo();

  // defaultImage =
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s';

  constructor(private userAuthService: UserAuthService) {
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
    // this.route.navigate(['/']);
  }

  login() {
    window.location.href = 'https://zj6lfhgilj.execute-api.us-east-1.amazonaws.com/auth/google';
  }

  onImageError(event: any) {
    event.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s';
  }
}
