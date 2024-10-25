import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';
import { Router } from '@angular/router';
import { ReportIdService } from '../services/report-id.service';
import { Report } from '../models/report';
import { FormsModule } from '@angular/forms';
import { AnnotationTableComponent } from '../annotation-table/annotation-table.component';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [FormsModule, AnnotationTableComponent],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css'
})
export class ReportDetailsComponent {
  user: UserInfo = new UserInfo(0,'', '', '');
  report: Report = new Report(0,0,'','','','','',new Date());

  constructor(private userAuthService: UserAuthService, private router: Router, private reportIdService: ReportIdService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      // this.router.navigate(['login']);
    }

    this.reportIdService.reportIdObservable.subscribe(data=>{
      this.report.id = data;
      //comment this out after we are able to send request to BE for report details,
      //in that case we search by id and fill below with the data we get back
      this.report.category = "Bribery";
      this.report.created_at = new Date();
      this.report.description = "So the trading company I was working with owns a building on the corner of 4th and 3rd..."
      this.report.location = "Chicago, IL";
      this.report.status = "Pending";
      this.report.title = "Trading Company Bribes City Planning Board";
      this.report.user_id = 1;
    });
  }

  resetReport(){
    //redo the get request from constructor
    //so will also want to comment this out
    this.report.category = "Bribery";
    this.report.description = "So the trading company I was working with owns a building on the corner of 4th and 3rd..."
    this.report.location = "Chicago, IL";
    this.report.status = "Pending";
    this.report.title = "Trading Company Bribes City Planning Board";
    this.report.user_id = 1;
  }

  updateReport(){
    //report local copy should already be ready to send off to BE
    //don't have BE here to this will have to do for now
    console.log("Report Updated!")
    this.router.navigate(['userLanding/reportTable']);
  }
}
