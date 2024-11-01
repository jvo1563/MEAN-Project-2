import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Report } from '../models/report';
import { Router } from '@angular/router';
import { BuisnessEntity } from '../models/buisness-entity';
import { HttpService } from '../services/http.service';
import { CategoryEntity } from '../models/category-entity';
import { StatusEntity } from '../models/status-entity';

//want to rework this and the user-report page when I get the time, make it more similar to how it works in report detailed view page

@Component({
  selector: 'app-anonymous-report',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private router: Router, private httpService: HttpService) {
    this.httpService.getAllCategories().subscribe((data) => {
      this.categories = data.body ? data.body : [];
    });

    this.httpService.getAllStatus().subscribe((data) => {
      this.statuses = data.body ? data.body : [];
    });

    // this.statuses = [new StatusEntity(1,'Pending')];
    // this.categories = [new CategoryEntity(1, 'Bad')];
  }

  //When contact BE this should be order of operations:
  //  -save report, then we need the reports id after this, can be a seperate get, or we can design custom post w/ return new id... idk
  //  -then need to loop through buisness entities and add them one at a time, BUT first set the report id using the return from the first step
  //  **do all this in where the console.log statement is currently located
  async submitReport() {
    this.report.status_id = 1;
    if (this.buis_entities.length) {
      this.buis_entities[this.buis_entities.length - 1] = this.buis_entity;
    }
    let new_report: Report = new Report(
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
    await this.httpService
      .createAnonymousReport(this.report)
      .subscribe((data) => {
        //!!! is sending status/category id to BE sufficient to create relations?
        console.log(data);
        if (data.body) {
          new_report = new Report(
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
        }
      });
    // if(new_report.id){//!!! Need to be able to anonymously post to buis table
    //   for(let buis of this.buis_entities){
    //     buis.report_id = new_report.id;//!!! Is this sufficient for creating relation to report?
    //     await this.httpService.createAnonymousBuisness(buis).subscribe(data=>{
    //       console.log(data);
    //     });
    //   }
    // }
    console.log(new_report);
    this.router.navigate(['']);
  }

  addBuisnessEntity() {
    if (this.buis_entities.length) {
      this.buis_entities[this.buis_entities.length - 1] = this.buis_entity;
    }
    this.buis_entities.push(new BuisnessEntity(0, 0, '', '', '', '', '', ''));
    this.buis_entity = new BuisnessEntity(0, 0, '', '', '', '', '', '');
  }

  //for now can only remove last buis_enitity added, but could implement soln to allow any of the added buisness entities to be removed
  removeBuisnessEntity() {
    if (this.buis_entities.length > 0) {
      if (this.buis_entities.length > 1) {
        this.buis_entity = this.buis_entities[this.buis_entities.length - 2];
      } else {
        this.buis_entity = new BuisnessEntity(0, 0, '', '', '', '', '', '');
      }
      this.buis_entities.pop();
    }
  }
}
