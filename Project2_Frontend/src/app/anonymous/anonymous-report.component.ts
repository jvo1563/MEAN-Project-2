import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Report } from '../models/report';
import { Router } from '@angular/router';
import { BuisnessEntity } from '../models/buisness-entity';
import { HttpService } from '../services/http.service';
import { CategoryEntity } from '../models/category-entity';
import { StatusEntity } from '../models/status-entity';
import { BuisnessCardComponent } from '../buisness-card/buisness-card.component';

//want to rework this and the user-report page when I get the time, make it more similar to how it works in report detailed view page

@Component({
  selector: 'app-anonymous-report',
  standalone: true,
  imports: [FormsModule, BuisnessCardComponent],
  templateUrl: './anonymous-report.component.html',
  styleUrl: './anonymous-report.component.css',
})
export class AnonymousReportComponent {
  report: Report = new Report(
    0,
    0,
    0,
    '',
    '',
    '',
    0,
    0,
    new Date(),
    new Date()
  );
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity(
    0,
    0,
    '',
    '',
    '',
    '',
    '',
    ''
  );
  categories: CategoryEntity[] = [];
  statuses: StatusEntity[] = [];

  constructor(private router:Router, private httpService:HttpService){
    this.httpService.anonymousGetCategories().subscribe(data=>{
      this.categories = (data.body)?data.body:[];
    });

    this.httpService.anonymousGetStatus().subscribe(data=>{
      this.statuses = (data.body)?data.body:[];
    });
  }

  //When contact BE this should be order of operations:
  //  -save report, then we need the reports id after this, can be a seperate get, or we can design custom post w/ return new id... idk
  //  -then need to loop through buisness entities and add them one at a time, BUT first set the report id using the return from the first step
  //  **do all this in where the console.log statement is currently located
submitReport(){
    this.report.status_id = 1;
    this.report.category_id = Number(this.report.category_id);
    console.log(this.report);
    this.httpService.createAnonymousReport(this.report).subscribe(data=>{//!!! is sending status/category id to BE sufficient to create relations?
      console.log(data.body);
      if(data.body){
        console.log("HERE", data.body[0].id);
        for(let buis of this.buis_entities){
          buis.report_id = data.body[0].id;//!!! Is this sufficient for creating relation to report?
          this.httpService.createAnonymousBuisness(buis).subscribe(data=>{
            console.log(data);
          });
        }
      }
    })
    this.router.navigate([''])
  }

  updateBuisnessEntity(index:number, diffEntity:BuisnessEntity){
    //doesn't actually do anything here
  }

  addBuisnessEntity(){
    this.buis_entities.push(this.buis_entity);
    this.buis_entity = new BuisnessEntity(0,0,'','','','','','');
  }
  
  removeBuisnessEntity(index:number){
    let temp_entities:BuisnessEntity[] = [];
    for(let i=0; i < this.buis_entities.length; i++){
      if(i !== index){
        temp_entities.push(this.buis_entities[i]);
      }
    }
    this.buis_entities = temp_entities;
  }


  returnToHome(){
    this.router.navigate(['']);
  }
}
