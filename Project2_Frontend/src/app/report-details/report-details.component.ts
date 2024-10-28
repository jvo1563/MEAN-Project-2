import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';
import { Router } from '@angular/router';
import { ReportIdService } from '../services/report-id.service';
import { Report } from '../models/report';
import { FormsModule } from '@angular/forms';
import { AnnotationTableComponent } from '../annotation-table/annotation-table.component';
import { BuisnessEntity } from '../models/buisness-entity';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [FormsModule, AnnotationTableComponent],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.css'
})
export class ReportDetailsComponent {
  user: UserInfo = new UserInfo(0,'', '', '');
  report: Report = new Report(0,0,'','','','','',new Date(),new Date());
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity(0,0,'','','','','','');

  constructor(private userAuthService: UserAuthService, private router: Router, private reportIdService: ReportIdService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      // this.router.navigate(['login']);
    }

    this.reportIdService.reportIdObservable.subscribe(data=>{
      this.report.id = 1;
      //comment this out after we are able to send request to BE for report details,
      //in that case we search by id and fill below with the data we get back
      //NOTE: that for list of buisnesses associated with the report we will do something like: this.buis_entites = data.buisnesses;
      this.report.category = "Bribery";
      this.report.created_at = new Date();
      this.report.updated_at = new Date();
      this.report.description = "So the trading company I was working with owns a building on the corner of 4th and 3rd..."
      this.report.location = "Chicago, IL";
      this.report.status = "Pending";
      this.report.title = "Trading Company Bribes City Planning Board";
      this.report.user_id = 1;
      this.buis_entities = [
        new BuisnessEntity(1,1,'MBC','Banking','1223 North St Suit 22, Jet OH, 12344','mbc@gmail.com','123334552','Perpetrator'),
        new BuisnessEntity(2,1,'Merril Co.','Consumer Appliances','454 Main St N, West IL, 67922','merril@outlook.com','2313215553','Co-perpatrator'),
        new BuisnessEntity(3,1,'Clasps & Co.','Industrial Equipment','122 Smith Ave, Sunny CA, 10982','claspsco@outlook.com','1235565789','Accessory')
      ];
    });
  }

  resetReport(){
    //redo the get request from constructor
    //so will also want to comment this out
    this.report.category = "Bribery";
    this.report.description = "So the trading company I was working with owns a building on the corner of 4th and 3rd..."
    this.report.location = "Chicago, IL";
    this.report.status = "Pending";
    this.report.title = "Trading Company Bribes City Planning Board";
    this.report.user_id = 1;
    this.buis_entities = [
      new BuisnessEntity(1,this.report.id,'MBC','Banking','1223 North St Suit 22, Jet OH, 12344','mbc@gmail.com','123334552','Perpetrator'),
      new BuisnessEntity(2,this.report.id,'Merril Co.','Consumer Appliances','454 Main St N, West IL, 67922','merril@outlook.com','2313215553','Co-perpatrator'),
      new BuisnessEntity(3,this.report.id,'Clasps & Co.','Industrial Equipment','122 Smith Ave, Sunny CA, 10982','claspsco@outlook.com','1235565789','Accessory')
    ];
  }

  updateReport(){
    //report local copy should already be ready to send off to BE
    //don't have BE here to this will have to do for now
    this.report.updated_at = new Date();
    console.log("Report Updated!")
    this.router.navigate(['userLanding/reportTable']);
  }
  


  //probs need to move some of this to update report...?
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
      this.buis_entities[this.buis_entities.length] = this.buis_entity;
    }
    this.buis_entities.push(new BuisnessEntity(0,0,'','','','','',''));
    this.buis_entity = new BuisnessEntity(0,0,'','','','','','');
  }
  
  //for now can only remove last buis_enitity added, but could implement soln to allow any of the added buisness entities to be removed
  removeBuisnessEntity(){
    if(this.buis_entities.length>0){
      this.buis_entity = this.buis_entities[this.buis_entities.length - 1];
      this.buis_entities.pop();
    }
    else{
      this.buis_entity = new BuisnessEntity(0,0,'','','','','','');
    }
  }
}
