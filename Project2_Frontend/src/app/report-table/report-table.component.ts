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

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.css',
})
export class ReportTableComponent {
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
    console.log(this.user);
    this.httpService.getAllReports().subscribe((data) => {
      console.log(data.body);
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
                report.updated_at
              );
            }
          )
        : [];
      // Sort by ID
      this.reports.sort((a, b) => a.id - b.id);
      this.reportsToDisplay = this.reports;
    });
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
        console.log('Report Delete Success!');
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

  returnToLanding() {
    this.router.navigate([`userLanding`]);
  }
}
