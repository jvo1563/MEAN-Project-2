import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { Report } from '../models/report';
import { FormsModule } from '@angular/forms';
import { BuisnessEntity } from '../models/buisness-entity';

@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.css'
})
export class UserReportComponent {
  user:UserInfo = new UserInfo(0,'','','');
  report: Report = new Report(0,0,'','','','','',new Date(), new Date());
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity(0,0,'','','','','','');

  constructor(private userAuthService:UserAuthService, private router:Router){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    if(!this.user.userToken){//check token auth
      this.router.navigate(['login']);
    }
  }

  //order for submitting to BE should be identical to that of the anonymous report
  submitReport(){
    this.report.status = "Pending"
    this.report.user_id = this.user.userId;
    if(this.buis_entities.length){
      this.buis_entities[this.buis_entities.length - 1] = this.buis_entity;
    }
    console.log(this.report);
    this.router.navigate(['userLanding']);
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
