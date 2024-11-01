import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: UserInfo = new UserInfo();

  constructor(private userAuthService: UserAuthService) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });
  }

  // googleLogin(){
  //   window.location.href = 'http://localhost:3000/auth/google';
  // }
}
