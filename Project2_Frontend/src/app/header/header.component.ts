import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

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

  //use user data to create user icon and dropdown menu
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });
  }

  isRoute(route: string): boolean {
    return this.router.url.endsWith(route);
  }

  //log user out, removing token and cleaning out the user auth info in the userAuthService
  logout() {
    // Remove token from local storage
    localStorage.removeItem('auth_token');
    // this.userAuthService.updateUserInfo();
    this.userAuthService.refreshUserInfo();
    // Redirect to home page with router
    // this.route.navigate(['/']);
  }

  //if not loged in, redirect to gw to go to BE to go to google oauth and return with user auth info
  login() {
    window.location.href = `${environment.apiUrl}/auth/google`;
  }

  //if user image dne, handle error
  onImageError(event: any) {
    event.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s';
  }
}
