import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { UserAuthService } from '../services/user-auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserSpecificReportsComponent } from '../user-specific-reports/user-specific-reports.component';

@Component({
  selector: 'app-user-landing',
  standalone: true,
  imports: [RouterLink, UserSpecificReportsComponent],
  templateUrl: './user-landing.component.html',
  styleUrl: './user-landing.component.css'
})
export class UserLandingComponent {
  user: UserInfo = new UserInfo(0,'', '', '');

  //fairly simple, just need user authentication info to know if we should send them back to the home page or if they are authorized to be here
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
