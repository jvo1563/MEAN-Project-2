import { Component } from '@angular/core';
import { Annotation } from '../models/annotation';
import { UserInfo } from '../models/user-info';
import { UserAuthService } from '../services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';

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

  constructor(private route:ActivatedRoute,private userAuthService: UserAuthService, private router: Router, private httpService:HttpService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
      this.annotation.created_by = data.userId;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      this.router.navigate(['']);
    }

    this.route.params.subscribe(data=>{
      this.annotation.report_id = Number(data["report_id"]);
    })
  }

  createAnnotation(){
    //should reach out to BE here and create the new annotation
    console.log(this.annotation);
    this.httpService.createAnnotation(this.annotation).subscribe(data=>{
      if(data.body){
        console.log("Annotation Create Success!");
      }
      else{
        console.log("!!! Annotation Create Error !!!");
      }
    });
    this.router.navigate([`userLanding/reportTable/reportDetails/${this.annotation.report_id}`]);
  }

  cancel(){
    this.router.navigate([`userLanding/reportTable/reportDetails/${this.annotation.report_id}`])
  }
}
