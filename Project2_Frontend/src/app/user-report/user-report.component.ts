import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user-info';
import { Report } from '../models/report';
import { FormsModule } from '@angular/forms';
import { BuisnessEntity } from '../models/buisness-entity';
import { CategoryEntity } from '../models/category-entity';
import { HttpService } from '../services/http.service';
import { StatusEntity } from '../models/status-entity';
import { BuisnessCardComponent } from '../buisness-card/buisness-card.component';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [FormsModule, BuisnessCardComponent, CommonModule],
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.css',
})
export class UserReportComponent {
  //local varaibles/objects for use in enabling funtionality
  user: UserInfo = new UserInfo(0, '', '', '');
  report: Report = new Report();
  buis_entities: BuisnessEntity[] = [];
  buis_entity: BuisnessEntity = new BuisnessEntity();
  categories: CategoryEntity[] = [];
  statuses: StatusEntity[] = [];

  //Want to check to see if user has token and get user data using the userAuthService before making call to BE
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });

    if (!this.user.userToken) {
      //check token auth
      this.router.navigate(['']);
    }

    this.httpService.getAllCategories().subscribe((data) => {//need categories to choose from
      if (data.body) {
        this.categories = data.body;
      }
    });

    this.httpService.getAllStatus().subscribe((data) => {//need to know what status is associated with what id 
      if (data.body) {
        this.statuses = data.body;
      }
    });
    this.refreshFlowbite();
  }

  //order for submitting to BE should be identical to that of the anonymous report
  submitReport() {
    for (let status of this.statuses) {
      //find id for pending
      if (status.status_name === 'Pending') {
        this.report.status_id = status.id;
      }
    }

    this.report.created_by = this.user.userId; //set created_by to current user's id

    this.report.category_id = Number(this.report.category_id);//cast html form variable to number

    //set final buiness that we added in
    if (this.buis_entities.length) {
      this.buis_entities[this.buis_entities.length - 1] = this.buis_entity;
    }

    //need varaible to keep what report we just created to then post the buisness entities
    let newReportId: number = 0;

    this.httpService.createReport(this.report).subscribe((data) => {
      console.log(data.body);
      if (data.body) {
        newReportId = data.body.id;
        if (newReportId === 0) {
          this.router.navigate(['userLanding']);
        } else {
          console.log(this.buis_entities);
          for (let buis of this.buis_entities) {//post buisness entities
            buis.report_id = newReportId;
            this.httpService.createBuisness(buis).subscribe((data) => {
              console.log("Create Bussiness Success!");
            });
          }
          this.router.navigate(['userLanding']);//after done posting return to user landing page
        }
      }
    });
  }

  updateBuisnessEntity(index: number, diffEntity: BuisnessEntity) {
    // Find entity at index and update it
    this.buis_entities[index] = diffEntity;
  }

  // they need their own id for the modal to work
  counter: number = 1;
  addBuisnessEntity() {
    this.buis_entity.id = this.counter;
    this.counter++;
    this.buis_entities.push(this.buis_entity);
    this.buis_entity = new BuisnessEntity();
    this.refreshFlowbite();
  }

  //have not actually posted buisness entities yet, so need to just remove one from the array locally
  removeBuisnessEntity(index: number) {
    let temp_entities: BuisnessEntity[] = [];
    for (let i = 0; i < this.buis_entities.length; i++) {
      if (i !== index) {
        temp_entities.push(this.buis_entities[i]);
      }
    }
    this.buis_entities = temp_entities;
  }

  //return to user landing page
  returnToLanding() {
    this.router.navigate(['userLanding']);
  }

  //refresh page when data has been populated
  refreshFlowbite() {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
