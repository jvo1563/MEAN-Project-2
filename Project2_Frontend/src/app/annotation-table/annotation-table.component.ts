import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { Annotation } from '../models/annotation';
import { ReportIdService } from '../services/report-id.service';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { AnnotationIdService } from '../services/annotation-id.service';

@Component({
  selector: 'app-annotation-table',
  standalone: true,
  imports: [],
  templateUrl: './annotation-table.component.html',
  styleUrl: './annotation-table.component.css'
})
export class AnnotationTableComponent {
  annotations: Annotation[] = [];
  reportId: number = 0;
  currentPage: number = 0;
  annotationCount:number = 0;

  //note we are embedding this in the report details page and don't need to check auth, since parent will do that
  constructor(private annotationIdService: AnnotationIdService, private reportIdService: ReportIdService, private router: Router){
    this.reportIdService.reportIdObservable.subscribe(data=>{
      this.reportId = data;
      //need count of annotations for some functionality, so will need to reach out to db
      //and get count of annotations associated with this report, will mock it here though
      this.getAnnotationCount();
      //need this to send get req to be for all annotations associated with this report
      //would do that here, but for now we'll just set up annotations manually
      this.getPageOfAnnotations();
    });
  }

  getAnnotationCount(){
    this.annotationCount = 22;
  }

  getPageOfAnnotations(){
    let mockDB: Annotation[] = [
      new Annotation(1, this.reportId, 1, "Title 1", "Annotation 1", new Date()),
      new Annotation(2, this.reportId, 2, "Title 2", "Annotation 2", new Date()),
      new Annotation(3, this.reportId, 1, "Title 3", "Annotation 3", new Date()),
      new Annotation(4, this.reportId, 1, "Title 4", "Annotation 4", new Date()),
      new Annotation(5, this.reportId, 1, "Title 5", "Annotation 5", new Date()),
      new Annotation(6, this.reportId, 2, "Title 6", "Annotation 6", new Date()),
      new Annotation(7, this.reportId, 2, "Title 7", "Annotation 7", new Date()),
      new Annotation(8, this.reportId, 2, "Title 8", "Annotation 8", new Date()),
      new Annotation(9, this.reportId, 1, "Title 9", "Annotation 9", new Date()),
      new Annotation(10, this.reportId, 1, "Title 10", "Annotation 10", new Date()),
      new Annotation(11, this.reportId, 1, "Title 11", "Annotation 11", new Date()),
      new Annotation(12, this.reportId, 1, "Title 12", "Annotation 12", new Date()),
      new Annotation(13, this.reportId, 1, "Title 13", "Annotation 13", new Date()),
      new Annotation(14, this.reportId, 1, "Title 14", "Annotation 14", new Date()),
      new Annotation(15, this.reportId, 2, "Title 15", "Annotation 15", new Date()),
      new Annotation(16, this.reportId, 2, "Title 16", "Annotation 16", new Date()),
      new Annotation(17, this.reportId, 1, "Title 17", "Annotation 17", new Date()),
      new Annotation(18, this.reportId, 1, "Title 18", "Annotation 18", new Date()),
      new Annotation(19, this.reportId, 1, "Title 19", "Annotation 19", new Date()),
      new Annotation(20, this.reportId, 1, "Title 20", "Annotation 20", new Date()),
      new Annotation(21, this.reportId, 1, "Title 21", "Annotation 21", new Date()),
      new Annotation(22, this.reportId, 3, "Title 22", "Annotation 22", new Date())
    ];

    //here we would use currentPage and report id to get the corrent range of annotations(5 per page)
    //but for now since no BE yet we'll use the above as our mock db, comment above and below out when BE
    //active
    let result: Annotation[] = [];
    for(let i=0; i < mockDB.length; i++){
      if((i >= this.currentPage*5) && (i < (this.currentPage+1)*5)){
        result.push(mockDB[i]);
      }
    }
    this.annotations = result;
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
    this.router.navigate(['userLanding/reportTable/reportDetails/addAnnotation']);
  }

  details(annotationId: number){
    this.annotationIdService.setAnnotationId(annotationId);
    this.router.navigate(['userLanding/reportTable/reportDetails/annotationDetails']);
  }
}
