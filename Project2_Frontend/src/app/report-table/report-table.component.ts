import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { Report } from '../models/report';
import { ReportIdService } from '../services/report-id.service';

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.css'
})
export class ReportTableComponent {
  user: UserInfo = new UserInfo(0,'', '', '');

  reports: Report[] =[
    new Report(1,0,'Title1','This is what happened here in this case....','Washington DC','Misc','Preliminary',new Date()),
    new Report(2,1,'Title2','This is what happened here in this case....','New York City','Tax Evasion','Pending',new Date()),
    new Report(3,2,'Title3','This is what happened here in this case....','Chicago','Bribery','Complete',new Date())
  ]

  constructor(private userAuthService: UserAuthService, private router: Router, private reportIdService: ReportIdService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      this.router.navigate(['login']);
    }
  }

  reportDetails(reportId:number){
    this.reportIdService.setReportId(reportId);
  }

  annotations(reportId:number){
    this.reportIdService.setReportId(reportId);
  }

  deleteReport(reportId:number){
    this.reportIdService.setReportId(reportId);
  }
}
