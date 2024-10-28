import { Component } from '@angular/core';
import { AnonymousReportComponent } from '../anonymous/anonymous-report.component';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { Report } from '../models/report';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.css'
})
export class UserReportComponent {
  user:UserInfo = new UserInfo(0,'','','');
  report: Report = new Report(0,0,'','','','','',new Date());

  constructor(private userAuthService:UserAuthService, private router:Router){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    if(!this.user.userToken){//check token auth
      this.router.navigate(['login']);
    }
  }

  submitReport(){
    this.report.status = "Pending"
    this.report.user_id = this.user.userId;
    console.log(this.report);
    this.router.navigate(['userLanding']);
  }

}
