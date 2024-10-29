import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Report } from '../models/report';
import { Router } from '@angular/router';
import { BuisnessEntity } from '../models/buisness-entity';

//want to rework this and the user-report page when I get the time, make it more similar to how it works in report detailed view page

@Component({
  selector: 'app-anonymous-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './anonymous-report.component.html',
  styleUrl: './anonymous-report.component.css'
})
export class AnonymousReportComponent {
  constructor(private router:Router){}
  report: Report = new Report(0,0,'','','','','',new Date(),new Date());
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity(0,0,'','','','','','');

  //When contact BE this should be order of operations:
  //  -save report, then we need the reports id after this, can be a seperate get, or we can design custom post w/ return new id... idk
  //  -then need to loop through buisness entities and add them one at a time, BUT first set the report id using the return from the first step
  //  **do all this in where the console.log statement is currently located
  submitReport(){
    this.report.status = "Preliminary";
    if(this.buis_entities.length){
      this.buis_entities[this.buis_entities.length - 1] = this.buis_entity;
    }
    console.log(this.report);
    this.router.navigate([''])
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
