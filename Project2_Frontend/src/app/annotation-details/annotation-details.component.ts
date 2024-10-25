import { Component } from '@angular/core';
import { Annotation } from '../models/annotation';
import { AnnotationIdService } from '../services/annotation-id.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { FormsModule } from '@angular/forms';

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

  constructor(private annotationIdService: AnnotationIdService, private userAuthService: UserAuthService, private router: Router){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      this.router.navigate(['login']);
    }

    this.annotationIdService.annotationIdObservable.subscribe(data=>{
      this.annotation.id = data;
      //here we get this specic annotation from backend
      //this is a mock up of what the returned data might look like
      this.annotation.created_at = new Date();
      this.annotation.report_id = 2;
      this.annotation.user_id = 1;
      this.annotation.title = 'A mock annotation';
      this.annotation.annotation = "This is a mock entry for the annotation field of the annotation object";
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
