import { Component } from '@angular/core';
import { Annotation } from '../models/annotation';
import { AnnotationIdService } from '../services/annotation-id.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-annotation-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './annotation-details.component.html',
  styleUrl: './annotation-details.component.css'
})
export class AnnotationDetailsComponent {
  user: UserInfo = new UserInfo(0,'','','')
  annotation: Annotation = new Annotation(0,0,0,'','',new Date());

  constructor(private annotationIdService: AnnotationIdService, private userAuthService: UserAuthService, private router: Router, private httpService: HttpService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      this.router.navigate(['']);
    }

    this.annotationIdService.annotationIdObservable.subscribe(data=>{
      this.annotation.id = data;
      //here we get this specic annotation from backend
      //this is a mock up of what the returned data might look like
      this.httpService.getAnnotationById(this.annotation.id).subscribe(data=>{
        if(data.body){
          this.annotation.annotation = data.body.annotation;
          this.annotation.created_at = data.body.created_at;
          this.annotation.created_by = data.body.created_by;
          this.annotation.report_id = data.body.report_id;
          this.annotation.title = data.body.title;
        }
      })
    })
  }

  updateAnnotation(){
    //should actually reach out to BE here
    console.log('Annotation Saved!');
    this.router.navigate(['userLanding/reportTable/reportDetails']);
  }

  resetAnnotation(){
    //should redo get operation here
    this.annotation.title = 'A mock annotation';
    this.annotation.annotation = "This is a mock entry for the annotation field of the annotation object"
  }
}
