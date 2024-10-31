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

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [FormsModule, AnnotationTableComponent, BuisnessCardComponent],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css'
})
export class ReportDetailsComponent {
  user: UserInfo = new UserInfo(0,'', '', '');
  report: Report = new Report(0,0,0,'','','',0,0,new Date(),new Date());
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity(0,0,'','','','','','');
  handlers: UserEntity[] = [];
  statuses: StatusEntity[] = [];
  categories: CategoryEntity[] = [];

  constructor(private userAuthService: UserAuthService, private router: Router, private route: ActivatedRoute, private httpService:HttpService, private annotationService: AnnotationInfoService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?!!!
    if(!this.user.userToken){
      this.router.navigate(['']);
    }

    this.httpService.getAllStatus().subscribe(data=>{
      this.statuses = (data.body)?data.body:[];
    })

    this.httpService.getAllCategories().subscribe(data=>{
      this.categories = (data.body)?data.body:[];
    })

    this.route.params.subscribe(data=>{
      this.report.id = data['report_id'];
      console.log("report id is: "+this.report.id);
      this.httpService.getReportById(this.report.id).subscribe(data=>{
        if(data.body){
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
          this.buis_entities = data.body.business_entities;
          annotationService.setAnnotation(new AnnotationInfo(data.body.id, data.body.annotations));
        }
      })
    });

    //This still needs to be done!!!
    if(this.user.userRole === 'Admin'){
      this.httpService.getAllUsers().subscribe(data=>{
        if(data.body){
          console.log(data.body)
          this.handlers = [];
          for(let user of data.body){
            if(user.role === "Handler"){
              this.handlers.push(user);
            }
          }
        }
      })
    }
  }

  resetReport(){
    this.httpService.getReportById(this.report.id).subscribe(data=>{
      this.report = (data.body)?new Report(
        data.body.id, 
        data.body.created_by, 
        data.body.assigned_to, 
        data.body.title, 
        data.body.description, 
        data.body.location, 
        data.body.category_id, 
        data.body.status_id, 
        data.body.created_at, 
        data.body.updated_at):new Report(0,0,0,'','','',0,0,new Date(),new Date());
    });
  }

  updateReport(){
    this.report.updated_at = new Date();
    this.report.status_id = Number(this.report.status_id);
    console.log(this.report)
    this.httpService.updateReport(this.report.id, this.report).subscribe(data=>{
      if(data.body){
        console.log("Report Successful Update", data.body);
      }
      else{
        console.log("!!! Report Update Error !!!");
      }
    })
  }
  
  //Should we call update report here? Want to update the last updated at time stamp....!!!
  //enable editing, adding, or removing businesses associated with this report
  updateBuisnessEntity(index: number, entity: BuisnessEntity){
    this.buis_entities[index] = entity;
    this.httpService.updateBuisness(entity.id, entity).subscribe(data=>{
      if(data.body){
        console.log("Business Successful Update");
      }
      else{
        console.log("!!! Business Update Error !!!");
      }
    })
  }

  deleteBuisnessEntity(index:number){
    let temp_entities: BuisnessEntity[]=[];
    for(let i=0; i < this.buis_entities.length; i++){
      if(i !== index){ 
        temp_entities.push(this.buis_entities[i]);
      }
    }
    this.httpService.deleteBuisness(this.buis_entities[index].id).subscribe(data=>{
      this.buis_entities = temp_entities;
      console.log("Business Successful Delete")
    })
  }

  addBuisnessEntity(){
    this.buis_entity.report_id = this.report.id;
    this.httpService.createBuisness(this.buis_entity).subscribe(data=>{
      if(data.body){
        this.buis_entities.push(data.body);
        console.log("Business Successful Create");
      }
      else{
        console.log("!!! Business Create Error !!!");
      }
    });
    this.buis_entity = new BuisnessEntity(0,0,'','','','','','');
  }



  returnToTable(){
    this.router.navigate(['userLanding/reportTable']);
  }
}
