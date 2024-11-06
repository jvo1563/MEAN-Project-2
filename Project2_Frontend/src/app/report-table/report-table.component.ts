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

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.css',
})
export class ReportTableComponent {
  //local variables to store data necessary for functionality
  user: UserInfo = new UserInfo(0, '', '', '');
  statuses: StatusEntity[] = [];
  categories: CategoryEntity[] = [];
  reports: Report[] = [];
  reportsToDisplay: Report[] = [];
  selectedStatus: number = 0;
  selectedAssignedTo: number = 0;
  selectedCreatedBy: number = 0;
  user_assigned_ids: number[] = [];
  user_created_ids: number[] = [];

  //check user has token, redirect if not, then get information we need from BE
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
    });

    this.httpService.getAllStatus().subscribe((data) => {
      this.statuses = data.body ? data.body : [];
    });

    // check token here, if invalid/blank return to login page... will need to reach out to oauth to check validity?
    if (!this.user.userToken) {
      this.router.navigate(['']);
    }

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
              if (!report.user_created)
                report.user_created = new UserEntity(0, '', 'Anonymous');
              if (!report.user_assigned)
                report.user_assigned = new UserEntity(0, '', 'Unassigned');
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
                report.user_assigned,
                report.user_created
              );
            }
          )
        : [];
      // Sort by ID
      this.reports.sort((a, b) => a.id - b.id);
      this.reportsToDisplay = this.reports;
    });
  }

  //need to find what category is associated with what ID
  findCategory(cat_id: number) {
    for (let category of this.categories) {
      if (category.id === cat_id) {
        return category.category_name;
      }
    }
    return 'NA';
  }

  //need to find what status is associated with what ID
  findStatus(status_id: number) {
    for (let status of this.statuses) {
      if (status.id === status_id) {
        return status.status_name;
      }
    }
    return 'NA';
  }

  //redirect to report details passing report id as route param so we can get the proper data in that new page
  reportDetails(reportId: number) {
    this.router.navigate([`userLanding/reportTable/reportDetails/${reportId}`]);
  }

  //delete report, first making sure that user is admin
  deleteReport(reportId: number) {
    if (this.user.userRole === 'Admin') {
      this.httpService.deleteReport(reportId).subscribe((data) => {
        console.log('Report Delete Success!');
        let tempReports: Report[] = [];
        for (let report of this.reports) {
          if (report.id !== reportId) {
            tempReports.push(report);
          }
        }
        this.reports = tempReports;
        this.reportsToDisplay = this.reports;
      });
    }
  }

  //redirect back to user landing page
  returnToLanding() {
    this.router.navigate([`userLanding`]);
  }

  //handle if user image throws error
  onImageError(event: any) {
    event.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCJpmc7wNF8Ti2Tuh_hcIRZUGOc23KBTx2A&s';
  }
}
