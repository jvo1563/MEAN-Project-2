import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { Annotation } from '../models/annotation';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { AnnotationInfo } from '../models/annotation-info';
import { UserAuthService } from '../services/user-auth.service';
import { CommonModule } from '@angular/common';
import { initFlowbite, initModals, initDropdowns } from 'flowbite';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-annotation-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './annotation-table.component.html',
  styleUrl: './annotation-table.component.css',
})
export class AnnotationTableComponent {
  //local data for enabling functionality
  user: UserInfo = new UserInfo();
  annotationInfo: AnnotationInfo = new AnnotationInfo(0, []);
  annotationsToDisplay: Annotation[] = [];
  currentPage: number = 0;
  totalPages: number = 1;
  annotationCount: number = 0;
  selectedAnnotation: Annotation = new Annotation();
  newAnnotationForm: Annotation = new Annotation();
  pressFlag: boolean = false;
  @Output() refreshParent = new EventEmitter<void>();//to tell parent they need to refresh

  //note we are embedding this in the report details page and don't need to check auth, since parent will do that
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private userAuthService: UserAuthService,
  ) {
    //route param is in the current url, need that to get list of annotations associated with report
    this.route.params.subscribe((data) => {
      this.annotationInfo.report_id = data['report_id'];
      this.refreshAnnotations();
    });

    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });
  }

  // Get Annotations from API(BE)
  refreshAnnotations() {
    this.httpService
      .getReportById(this.annotationInfo.report_id)
      .subscribe((data) => {
        if (data.body) {
          let temp_annotations: Annotation[] = data.body.annotations;
          // sort temp_annotations by id
          temp_annotations.sort((a, b) => a.id - b.id);
          this.annotationInfo.annotations = temp_annotations;
          this.annotationCount = this.annotationInfo.annotations.length;
          this.totalPages = Math.ceil(this.annotationCount / 5);
          this.getPageOfAnnotations();
        }
        this.refreshFlowbite();
      });
  }

  getPageOfAnnotations() {
    //here we would use currentPage and report id to get the corrent range of annotations(5 per page)
    let result: Annotation[] = [];
    for (let i = 0; i < this.annotationInfo.annotations.length; i++) {
      if (i >= this.currentPage * 5 && i < (this.currentPage + 1) * 5) {
        result.push(this.annotationInfo.annotations[i]);
      }
    }
    this.annotationsToDisplay = result;
    this.refreshFlowbite();
  }

  //subtract one from current page, and then get what 5 annotations to display
  backPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.getPageOfAnnotations();
    this.refreshFlowbite();
  }

  //divide length and ceil to get number of pages... 5 annotation rows per page
  forwardPage() {
    if (this.currentPage < Math.ceil(this.annotationCount / 5) - 1) {
      this.currentPage++;
    }
    this.getPageOfAnnotations();
    this.refreshFlowbite();
  }

  //post annotation and then refresh annotations and tell parent to update the last time the report was updated
  createAnnotation() {
    this.newAnnotationForm.created_by = this.user.userId;
    this.newAnnotationForm.report_id = this.annotationInfo.report_id;
    this.httpService
      .createAnnotation(this.newAnnotationForm)
      .subscribe((data) => {
        console.log('Annotation Created Successfully');
        this.refreshAnnotations();
        this.updateReportLastUpdated();
      });
    // Reset create form
    this.newAnnotationForm = new Annotation();
  }

  //remove the annotation and update report details page to update the last time this report was updated
  deleteAnnotation(annotation_id: number) {
    if (this.user.userRole === 'Admin') {
      this.httpService.deleteAnnotation(annotation_id).subscribe((data) => {
        console.log('Annotation Delete Success!');
        this.currentPage = 0;
        this.refreshAnnotations();
        this.updateReportLastUpdated();
      });
    }
  }

  //update report then tell parent(report) that is should update the last time this report was updated
  updateAnnotationModal() {
    this.httpService
      .updateAnnotation(this.selectedAnnotation.id, this.selectedAnnotation)
      .subscribe((data) => {
        console.log('Annotation Updated Successfully');
        this.refreshAnnotations();
        this.updateReportLastUpdated();
      });
  }

  //emit event to tell parent to update the last time this report was updated
  updateReportLastUpdated() {
    this.httpService
      .updateUpdatedAtReport(this.annotationInfo.report_id, new Date())
      .subscribe((data) => {
        this.refreshParent.emit();
      });
  }

  //for modal
  openModal(annotation: Annotation) {
    this.selectedAnnotation = structuredClone(annotation);
  }

  //refresh page when data is populated
  refreshFlowbite() {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }

  //if image for user dne, handle error
  onImageError(event: any) {
    event.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s';
  }

  //if the user tries to submit, but the form is still invalid, use this flag to check so we can display errors on page
  submitAttempt(){
    this.pressFlag = true;
  }
}
