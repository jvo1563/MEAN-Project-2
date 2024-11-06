import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { Report } from '../models/report';
import { StatusEntity } from '../models/status-entity';
import { CategoryEntity } from '../models/category-entity';
import { HttpService } from '../services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserEntity } from '../models/user-entity';
import { initDropdowns, initFlowbite } from 'flowbite';

@Component({
  selector: 'app-user-specific-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-specific-reports.component.html',
  styleUrl: './user-specific-reports.component.css',
})
export class UserSpecificReportsComponent {
  user: UserInfo = new UserInfo(0, '', '', '');
  statuses: StatusEntity[] = [];
  categories: CategoryEntity[] = [];
  reports: Report[] = [];
  reportsForUser: Report[] = [];
  reportsToDisplay: Report[] = [];
  selectedReport: Report = new Report(
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
  selectedStatus: number = -1;
  selectedAssignedTo: number = -1;
  selectedCreatedBy: number = -1;
  users_assigned: UserEntity[] = [];
  users_created: UserEntity[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.userAuthService.userAuthObservable.subscribe((data) => {
      this.user = data;
    });

    this.httpService.getAllCategories().subscribe((data) => {
      this.categories = data.body ? data.body : [];
      this.refreshFlowbite();
    });

    this.httpService.getAllStatus().subscribe((data) => {
      this.statuses = data.body ? data.body : [];
      this.refreshFlowbite();
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if (!this.user.userToken) {
      this.router.navigate(['']);
    }
    
    if (this.user.userRole !== 'Admin') {
      this.httpService.getUserById(this.user.userId).subscribe((data) => {
        this.reports = data.body.assigned_reports
          ? data.body.assigned_reports.map(
              (report: {
                id: number;
                created_by: number;
                assigned_to: number;
                title: string;
                description: string;
                location: string;
                category_id: number;
                status_id: number;
                created_at: Date;
                updated_at: Date;
                user_assigned: UserEntity;
                user_created: UserEntity;
              }) => {
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
                  report.updated_at,
                  (report.user_assigned)?
                  new UserEntity(
                    report.user_assigned.id,
                    report.user_assigned.email,
                    report.user_assigned.first_name,
                    report.user_assigned.last_name,
                    report.user_assigned.picture,
                    report.user_assigned.role
                  ):new UserEntity(0, '', '', '', '', '', new Date()),
                  (report.user_created)?new UserEntity(
                    report.user_created.id,
                    report.user_created.email,
                    report.user_created.first_name,
                    report.user_created.last_name,
                    report.user_created.picture,
                    report.user_created.role
                  ):new UserEntity(0, '', '', '', '', '', new Date())
                );
              }
            )
          : [];
        this.reportsForUser = this.reports;
        this.getPageOfReports();
        this.refreshFlowbite();
      });
    } else {
      this.httpService.getAllReports().subscribe((data) => {
        this.reports = data.body
          ? data.body.map(
              (report: {
                id: number;
                created_by: number;
                assigned_to: number;
                title: string;
                description: string;
                location: string;
                category_id: number;
                status_id: number;
                created_at: Date;
                updated_at: Date;
                user_assigned: UserEntity;
                user_created: UserEntity;
              }) => {
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
                  report.updated_at,
                  (report.user_assigned)?
                  new UserEntity(
                    report.user_assigned.id,
                    report.user_assigned.email,
                    report.user_assigned.first_name,
                    report.user_assigned.last_name,
                    report.user_assigned.picture,
                    report.user_assigned.role
                  ):new UserEntity(0, '', '', '', '', '', new Date()),
                  (report.user_created)?new UserEntity(
                    report.user_created.id,
                    report.user_created.email,
                    report.user_created.first_name,
                    report.user_created.last_name,
                    report.user_created.picture,
                    report.user_created.role
                  ):new UserEntity(0, '', '', '', '', '', new Date())
                );
              }
            )
          : [];
        this.reportsForUser = this.reports;
        this.listUserAssignedIds();
        this.listUserCreatedIds();
        this.getPageOfReports();
        this.refreshFlowbite();
      });
    }
  }

  findCategory(cat_id: number) {
    for (let category of this.categories) {
      if (category.id === cat_id) {
        return category.category_name;
      }
    }
    return 'NA';
  }

  findStatus(status_id: number) {
    for (let status of this.statuses) {
      if (status.id === status_id) {
        return status.status_name;
      }
    }
    return 'NA';
  }

  reportDetails(reportId: number) {
    this.router.navigate([`userLanding/reportTable/reportDetails/${reportId}`]);
  }

  deleteReport(reportId: number) {
    if (this.user.userRole === 'Admin') {
      this.httpService.deleteReport(reportId).subscribe((data) => {
        let tempReports: Report[] = [];
        for (let report of this.reports) {
          if (report.id !== reportId) {
            tempReports.push(report);
          }
        }
        this.reports = tempReports;
      });
    }
  }

  filter() {
    let tempReports: Report[] = this.reports;
    this.reportsForUser = [];
    this.selectedStatus = Number(this.selectedStatus);
    this.selectedAssignedTo = Number(this.selectedAssignedTo);
    this.selectedCreatedBy = Number(this.selectedCreatedBy);
    if (this.selectedStatus !== -1) {
      tempReports = tempReports.filter((report) => {
        if (report.status_id === this.selectedStatus) {
          return true;
        } else {
          return false;
        }
      });
    }

    if (this.selectedAssignedTo !== -1) {
      tempReports = tempReports.filter((report) => {
        if (report.user_assigned.id === this.selectedAssignedTo) {
          return true;
        } else {
          return false;
        }
      });
    }

    if (this.selectedCreatedBy !== -1) {
      tempReports = tempReports.filter((report) => {
        if (report.user_created.id === this.selectedCreatedBy) {
          return true;
        } else {
          return false;
        }
      });
    }

    this.reportsForUser = tempReports;
    this.currentPage = 0;
    this.getPageOfReports();
  }

  listUserAssignedIds() {
    let tempUserIds: number[] = [];
    this.users_assigned = [];
    for (let report of this.reports) {
      if (report.assigned_to && tempUserIds.indexOf(report.assigned_to) === -1) {
        this.users_assigned.push(report.user_assigned);
        tempUserIds.push(report.assigned_to);
      }
    }
    this.users_assigned.push(new UserEntity(0, '', 'Unassigned', '', '', '', new Date()))
  }

  listUserCreatedIds() {
    let tempUserIds: number[] = [];
    this.users_created = [];
    for (let report of this.reports) {
      if (report.created_by && tempUserIds.indexOf(report.created_by) === -1) {
        this.users_created.push(report.user_created);
        tempUserIds.push(report.created_by);
      }
    }
    this.users_created.push(new UserEntity(0, '', 'Anonymous', '', '', '', new Date()))
  }

  getPageOfReports() {
    //here we would use currentPage and report id to get the corrent range of annotations(5 per page)
    //but for now since no BE yet we'll use the above as our mock db, comment above and below out when BE
    //active
    let result: Report[] = [];
    for (let i = 0; i < this.reportsForUser.length; i++) {
      if (i >= this.currentPage * 5 && i < (this.currentPage + 1) * 5) {
        result.push(this.reportsForUser[i]);
      }
    }
    this.reportsToDisplay = result;

    this.totalPages = Math.ceil(this.reportsForUser.length / 5);
  }

  backPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.getPageOfReports();
  }

  //divide length and ceil to get number of pages... 5 annotation rows per page
  forwardPage() {
    if (this.currentPage < Math.ceil(this.reportsForUser.length / 5) - 1) {
      this.currentPage++;
    }
    this.getPageOfReports();
  }

  onImageError(event: any) {
    event.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s';
  }

  refreshFlowbite() {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
