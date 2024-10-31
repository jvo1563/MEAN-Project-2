import { Component, Input } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { Annotation } from '../models/annotation';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { AnnotationInfo } from '../models/annotation-info';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-annotation-table',
  standalone: true,
  imports: [],
  templateUrl: './annotation-table.component.html',
  styleUrl: './annotation-table.component.css'
})
export class AnnotationTableComponent {
  user: UserInfo = new UserInfo(0,'','','','','','');
  annotationInfo: AnnotationInfo = new AnnotationInfo(0, []);
  annotationsToDisplay: Annotation[] = [];
  currentPage: number = 0;
  annotationCount:number = 0;

  //note we are embedding this in the report details page and don't need to check auth, since parent will do that
  constructor(private route: ActivatedRoute, private router: Router, private httpService:HttpService, private userAuthService: UserAuthService){
    this.route.params.subscribe(data=>{
      this.annotationInfo.report_id = data['report_id'];
      this.httpService.getReportById(this.annotationInfo.report_id).subscribe(data=>{
        if(data.body){
          this.annotationInfo.annotations = data.body.annotations;
          this.annotationCount = this.annotationInfo.annotations.length;
          this.getPageOfAnnotations();
        }
      })
    });

    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
      console.log(this.user);
    })
  }

  getPageOfAnnotations(){
    //here we would use currentPage and report id to get the corrent range of annotations(5 per page)
    //but for now since no BE yet we'll use the above as our mock db, comment above and below out when BE
    //active
    let result: Annotation[] = [];
    for(let i=0; i < this.annotationInfo.annotations.length; i++){
      if((i >= this.currentPage*5) && (i < (this.currentPage+1)*5)){
        result.push(this.annotationInfo.annotations[i]);
      }
    }
    this.annotationsToDisplay = result;
  }

  backPage(){
    if(this.currentPage > 0){
      this.currentPage--;
    }
    this.getPageOfAnnotations();
  }

  //divide length and ceil to get number of pages... 5 annotation rows per page
  forwardPage(){
    if(this.currentPage < Math.ceil(this.annotationCount/5) - 1){
      this.currentPage++;
    }
    this.getPageOfAnnotations();
  }

  addAnnotation(){
    this.router.navigate([`userLanding/reportTable/reportDetails/addAnnotation/${this.annotationInfo.report_id}`]);
  }

  deleteAnnotation(annotation_id:number){
    if(this.user.userRole === 'Admin'){
      this.httpService.deleteAnnotation(annotation_id).subscribe(data=>{
        console.log("Annotation Delete Success!");
        let tempAnnotations: Annotation[] = [];
        for(let annotation of this.annotationInfo.annotations){
          if(annotation.id !== annotation_id){
            tempAnnotations.push(annotation);
          }
        }
        this.annotationInfo.annotations = tempAnnotations;
        this.currentPage = 0;
        this.getPageOfAnnotations();
      });
    }
  }

  details(annotationId: number){
    this.router.navigate([`userLanding/reportTable/reportDetails/annotationDetails/${annotationId}`]);
  }
}
