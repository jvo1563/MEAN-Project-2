import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  user: UserInfo = new UserInfo();

  constructor(private userAuthService: UserAuthService) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });
  }
}
