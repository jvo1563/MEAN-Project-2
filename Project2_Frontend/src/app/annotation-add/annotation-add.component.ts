import { Component } from '@angular/core';
import { Annotation } from '../models/annotation';
import { UserInfo } from '../models/user-info';
import { ReportIdService } from '../services/report-id.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-annotation-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './annotation-add.component.html',
  styleUrl: './annotation-add.component.css'
})
export class AnnotationAddComponent {
  annotation: Annotation = new Annotation(0,0,0,'','',new Date());
  user: UserInfo = new UserInfo(0,'','','');

  constructor(private reportIdService: ReportIdService, private userAuthService: UserAuthService, private router: Router){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
      this.annotation.created_by = data.userId;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      this.router.navigate(['']);
    }

    this.reportIdService.reportIdObservable.subscribe(data=>{
      this.annotation.report_id = data;
    })
  }

  createAnnotation(){
    //should reach out to BE here and create the new annotation
    console.log('Annotation Created!');
    this.router.navigate(['userLanding/reportTable/reportDetails']);
  }

  cancel(){
    this.router.navigate(['userLanding/reportTable/reportDetails'])
  }
}
