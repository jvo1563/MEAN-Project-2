import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { UserAuthService } from '../services/user-auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-landing.component.html',
  styleUrl: './user-landing.component.css'
})
export class UserLandingComponent {
  user: UserInfo = new UserInfo(0,'', '', '');

  constructor(private userAuthService: UserAuthService, private router: Router){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    //check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      this.router.navigate(['']);
    }
  }
}
