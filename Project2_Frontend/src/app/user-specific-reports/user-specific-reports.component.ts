import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { Report } from '../models/report';
import { StatusEntity } from '../models/status-entity';
import { CategoryEntity } from '../models/category-entity';
import { HttpService } from '../services/http.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-specific-reports',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-specific-reports.component.html',
  styleUrl: './user-specific-reports.component.css'
})
export class UserSpecificReportsComponent {
  user: UserInfo = new UserInfo(0,'', '', '');
  statuses: StatusEntity[] = [];
  categories: CategoryEntity[] = [];
  reports: Report[] =[]
  reportsToDisplay: Report[] = [];
  selectedStatus: number = 0;
  selectedAssignedTo: number = 0;
  selectedCreatedBy: number = 0;
  user_assigned_ids: number[] =[];
  user_created_ids: number[] =[];

  constructor(private userAuthService: UserAuthService, private router: Router, private httpService: HttpService){
    this.userAuthService.userAuthObservable.subscribe(data=>{
      this.user = data;
    });
    
    this.httpService.getAllCategories().subscribe(data=>{
      this.categories = (data.body)?data.body:[];
    })

    this.httpService.getAllStatus().subscribe(data=>{
      this.statuses = (data.body)?data.body:[];
    })

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if(!this.user.userToken){
      this.router.navigate(['']);
    }
    console.log(this.user)
    if(this.user.userRole !== 'Admin'){
      this.httpService.getUserById(this.user.userId).subscribe(data=>{
        console.log(data.body);
        this.reports = (data.body.reports)?data.body.reports.map((report: { id: number; created_by: number; assigned_to: number; title: string; description: string; location: string; category_id: number; status_id: number; created_at: Date; updated_at: Date; })=>{
            return new Report(
              report.id, 
              report.created_by, 
              report.assigned_to, 
              report.title, 
              report.description, 
              report.location, 
              report.category_id, 
              report.status_id, 
              report.created_at, 
              report.updated_at);
          }
        ):[];
        this.reportsToDisplay = this.reports;
      });
    }
    else{
      this.httpService.getAllReports().subscribe(data=>{
        console.log(data.body);
        this.reports = (data.body)?data.body.map((report: { id: number; created_by: number; assigned_to: number; title: string; description: string; location: string; category_id: number; status_id: number; created_at: Date; updated_at: Date; })=>{
            return new Report(
              report.id, 
              report.created_by, 
              report.assigned_to, 
              report.title, 
              report.description, 
              report.location, 
              report.category_id, 
              report.status_id, 
              report.created_at, 
              report.updated_at);
          }
        ):[];

        this.reportsToDisplay = this.reports;
        this.listUserAssignedIds();
        this.listUserCreatedIds();
      });
    }
  }

  

  findCategory(cat_id:number){
    for(let category of this.categories){
      if(category.id === cat_id){
        return category.category_name;
      }
    }
    return 'NA';
  }

  findStatus(status_id:number){
    for(let status of this.statuses){
      if(status.id === status_id){
        return status.status_name;
      }
    }
    return 'NA';
  }



  reportDetails(reportId:number){
    this.router.navigate([`userLanding/reportTable/reportDetails/${reportId}`]);
  }

  deleteReport(reportId:number){
    if(this.user.userRole === 'Admin'){
      this.httpService.deleteReport(reportId).subscribe(data=>{
        console.log("Report Delete Success!");
        let tempReports:Report[] = [];
        for(let report of this.reports){
          if(report.id !== reportId){
            tempReports.push(report);
          }
        }
        this.reports=tempReports;
      });
    }
  }



  filter(){
    let tempReports: Report[] = this.reports;
    this.reportsToDisplay = [];
    this.selectedStatus = Number(this.selectedStatus);
    this.selectedAssignedTo = Number(this.selectedAssignedTo);
    this.selectedCreatedBy = Number(this.selectedCreatedBy);
    if(this.selectedStatus){
      tempReports = tempReports.filter(report=>{
        if(report.status_id === this.selectedStatus){
          return true;
        }
        else{
          return false;
        }
      });
    }

    if(this.selectedAssignedTo){
      tempReports = tempReports.filter(report=>{
        if(report.assigned_to === this.selectedAssignedTo){
          return true;
        }
        else{
          return false;
        }
      });
    }

    if(this.selectedCreatedBy){
      tempReports = tempReports.filter(report=>{
        if(report.created_by === this.selectedCreatedBy){
          return true;
        }
        else{
          return false;
        }
      });
    }

    this.reportsToDisplay = tempReports;
  }



  listUserAssignedIds(){
    let tempUserIds: number[] = [];
    for(let report of this.reports){
      if(report.assigned_to && (tempUserIds.indexOf(report.assigned_to) === -1)){
        tempUserIds.push(report.assigned_to);
      }
    }
    this.user_assigned_ids = tempUserIds;
  }

  listUserCreatedIds(){
    let tempUserIds: number[] = [];
    for(let report of this.reports){
      if(report.created_by && (tempUserIds.indexOf(report.created_by) === -1)){
        tempUserIds.push(report.created_by);
      }
    }
    this.user_created_ids = tempUserIds;
  }



  returnToLanding(){
    this.router.navigate([`userLanding`]);
  }
}