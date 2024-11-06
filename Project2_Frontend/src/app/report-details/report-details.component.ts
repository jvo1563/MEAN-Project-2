import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from '../models/report';
import { FormsModule } from '@angular/forms';
import { AnnotationTableComponent } from '../annotation-table/annotation-table.component';
import { BuisnessEntity } from '../models/buisness-entity';
import { BuisnessCardComponent } from '../buisness-card/buisness-card.component';
import { UserEntity } from '../models/user-entity';
import { HttpService } from '../services/http.service';
import { StatusEntity } from '../models/status-entity';
import { CategoryEntity } from '../models/category-entity';
import { Annotation } from '../models/annotation';
import { AnnotationInfoService } from '../services/annotation-info.service';
import { AnnotationInfo } from '../models/annotation-info';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [
    FormsModule,
    AnnotationTableComponent,
    BuisnessCardComponent,
    CommonModule,
  ],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css',
})
export class ReportDetailsComponent {
  //local variables/objects to keep data we need to enable functionality
  user: UserInfo = new UserInfo();
  report: Report = new Report();
  update_report_form: Report = new Report();
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity();
  handlers: UserEntity[] = [];
  statuses: StatusEntity[] = [];
  categories: CategoryEntity[] = [];
  report_status: StatusEntity = new StatusEntity();
  report_category: CategoryEntity = new CategoryEntity();
  report_created_by: UserEntity = new UserEntity();
  report_assigned_to: UserEntity = new UserEntity();

  //using same services as other components, but also need access to route parameters and annotations info service
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private annotationService: AnnotationInfoService
  ) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?!!!
    if (!this.user.userToken) {
      this.router.navigate(['']);
    }

    this.httpService.getAllStatus().subscribe((data) => {
      this.statuses = data.body ? data.body : [];
    });

    this.httpService.getAllCategories().subscribe((data) => {
      this.categories = data.body ? data.body : [];
    });

    //get report id from route parameters
    this.route.params.subscribe((data) => {
      this.report.id = data['report_id'];
      this.refreshReport();
    });

    //get list of handlers to select from to assign them to this report, only if admin
    if (this.user.userRole === 'Admin') {
      this.httpService.getAllUsers().subscribe((data) => {
        if (data.body) {
          this.handlers = [];
          for (let user of data.body) {
            if (user.role === 'Handler') {
              this.handlers.push(user);
            }
          }
        }
      });
    }
  }

  //get report/refresh report upon updates
  refreshReport() {
    if (this.report.id) {
      console.log('refreshing report');
      this.httpService.getReportById(this.report.id).subscribe((data) => {
        if (data.body) {
          this.report = new Report(
            data.body.id,
            data.body.created_by,
            data.body.assigned_to,
            data.body.title,
            data.body.description,
            data.body.location,
            data.body.category_id,
            data.body.status_id,
            data.body.created_at,
            data.body.updated_at
          );
          // Used as a workaround to avoid reference issues
          this.update_report_form = structuredClone(this.report);

          this.buis_entities = data.body.business_entities;
          this.annotationService.setAnnotation(
            new AnnotationInfo(data.body.id, data.body.annotations)
          );
          this.report_status = data.body.status;
          this.report_category = data.body.category;
          if (data.body.user_assigned)
            this.report_assigned_to = data.body.user_assigned;
          else this.report_assigned_to.first_name = 'Unassigned';
          if (data.body.user_created)
            this.report_created_by = data.body.user_created;
          else this.report_created_by.first_name = 'Anonymous';
          this.refreshFlowbite();//refresh page when data is populated
        }
      });
    }
  }

  //reset report update form to actual data
  resetReportUpdateForm() {
    this.update_report_form = structuredClone(this.report);
  }

  //update the report in the BE using the updated local copy
  updateReport() {
    this.update_report_form.updated_at = new Date();
    this.httpService
      .updateReport(this.report.id, this.update_report_form)
      .subscribe((data) => {
        if (data.body) {
          console.log('Report Successful Update', data.body);
          this.refreshReport();
        } else {
          console.log('!!! Report Update Error !!!');
        }
      });
  }

  //delete report and return to user landing, only accessible to admins in the html, also protected in the BE
  deleteReport() {
    this.httpService.deleteReport(this.report.id).subscribe(() => {
      this.router.navigate(['/userLanding']);
    });
  }



  //enable editing, adding, or removing businesses associated with this report

  //update business entity associated with report, then update the date that this report was last updated at
  updateBuisnessEntity(index: number, entity: BuisnessEntity) {
    this.buis_entities[index] = entity;
    this.httpService.updateBuisness(entity.id, entity).subscribe((data) => {
      if (data.body) {
        console.log('Business Successful Update');
        this.httpService
          .updateUpdatedAtReport(this.report.id, new Date())
          .subscribe((data) => {
            if (data.body) {
              console.log('Report Updated After Business Update Too');
            } else {
              console.log('!!! Report Updated After Business Update Error !!!');
            }
          });
      } else {
        console.log('!!! Business Update Error !!!');
      }
    });
  }

  //delete and then set the updated at time for the report
  deleteBuisnessEntity(index: number) {
    let temp_entities: BuisnessEntity[] = [];
    for (let i = 0; i < this.buis_entities.length; i++) {
      if (i !== index) {
        temp_entities.push(this.buis_entities[i]);
      }
    }
    this.httpService
      .deleteBuisness(this.buis_entities[index].id)
      .subscribe((data) => {
        this.buis_entities = temp_entities;
        console.log('Business Successful Delete');
        this.httpService
          .updateUpdatedAtReport(this.report.id, new Date())
          .subscribe((data) => {
            if (data.body) {
              console.log('Report Updated After Business Update Too');
              this.report.updated_at = data.body.updated_at;
            } else {
              console.log('!!! Report Updated After Business Update Error !!!');
            }
          });
      });
  }

  //add business entity and then update the time the report was last updated at
  addBuisnessEntity() {
    this.buis_entity.report_id = this.report.id;
    this.httpService.createBuisness(this.buis_entity).subscribe((data) => {
      if (data.body) {
        this.buis_entities.push(data.body);
        console.log('Business Successful Create');
        this.httpService
          .updateUpdatedAtReport(this.report.id, new Date())
          .subscribe((data) => {
            if (data.body) {
              console.log('Report Updated After Business Update Too');
            } else {
              console.log('!!! Report Updated After Business Update Error !!!');
            }
          });
        this.refreshReport();
      } else {
        console.log('!!! Business Create Error !!!');
      }
    });
    this.buis_entity = new BuisnessEntity(0, 0, '', '', '', '', '', '');//reset local business entity we are building as we fill out the add business entity form
  }

  //return to reports table
  returnToTable() {
    this.router.navigate(['userLanding/reportTable']);
  }

  //refresh page once all data is populated
  refreshFlowbite() {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }

  //handle error if user image dne
  onImageError(event: any) {
    event.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s';
  }
}
