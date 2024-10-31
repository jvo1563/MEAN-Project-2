import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { Report } from '../models/report';
import { FormsModule } from '@angular/forms';
import { BuisnessEntity } from '../models/buisness-entity';
import { CategoryEntity } from '../models/category-entity';
import { HttpSentEvent } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { StatusEntity } from '../models/status-entity';

@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.css'
})
export class UserReportComponent {
  user:UserInfo = new UserInfo(0,'','','');
  report: Report = new Report(0,0,0,'','','',0,0,new Date(), new Date());
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity(0,0,'','','','','','');
  categories: CategoryEntity[] = [];
  statuses: StatusEntity[] = [];

  constructor(private userAuthService:UserAuthService, private router:Router, private httpService: HttpService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    if(!this.user.userToken){//check token auth
      this.router.navigate(['']);
    }

    this.httpService.getAllCategories().subscribe(data=>{
      if(data.body){
        this.categories = data.body;
        console.log(this.categories);
      }
    });

    this.httpService.getAllStatus().subscribe(data=>{
      if(data.body){
        this.statuses = data.body;
      }
    })
  }

  //order for submitting to BE should be identical to that of the anonymous report
  submitReport(){
    for(let status of this.statuses){//find id for pending
      if(status.status_name === 'Pending'){
        this.report.status_id = status.id;
      }
    }

    this.report.created_by = this.user.userId;//set created_by to current user's id

    this.report.category_id = Number(this.report.category_id);


    if(this.buis_entities.length){
      this.buis_entities[this.buis_entities.length - 1] = this.buis_entity;
    }
 
    console.log(this.report);
    let newReportId:number = 0;

    this.httpService.createReport(this.report).subscribe(data=>{
      if(data.body){
        console.log(data.body);
        newReportId = data.body.id;
        if(newReportId === 0){
          console.log("OH NO REPORT ID IS 00000000");
          this.router.navigate(['userLanding']);
        }
        else{
          console.log(`new id: ${newReportId}`);
          for(let buis of this.buis_entities){
            buis.report_id = newReportId;
            this.httpService.createBuisness(buis).subscribe(data=>{
              console.log(data.body);
            })
          }
          this.router.navigate(['userLanding']);
        }
      }
    })
  }

  addBuisnessEntity(){
    if(this.buis_entities.length){
      this.buis_entities[this.buis_entities.length - 1] = this.buis_entity;
    }
    this.buis_entities.push(new BuisnessEntity(0,0,'','','','','',''));
    this.buis_entity = new BuisnessEntity(0,0,'','','','','','');
  }
  
  //for now can only remove last buis_enitity added, but could implement soln to allow any of the added buisness entities to be removed
  removeBuisnessEntity(){
    if(this.buis_entities.length>0){
      if(this.buis_entities.length>1){
        this.buis_entity = this.buis_entities[this.buis_entities.length - 2];
      }
      else{
        this.buis_entity = new BuisnessEntity(0,0,'','','','','','');
      }
      this.buis_entities.pop();
    }
  }

}
