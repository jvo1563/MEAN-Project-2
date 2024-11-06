import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnonymousReportComponent } from './anonymous/anonymous-report.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserReportComponent } from './user-report/user-report.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'anonymous',
    component: AnonymousReportComponent,
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent,
  },
  {
    path: 'userLanding',
    component: UserLandingComponent,
  },
  {
    path: 'userLanding/userReport',
    component: UserReportComponent,
  },
  {
    path: 'userLanding/reportTable',
    component: ReportTableComponent,
  },
  {
    path: 'userLanding/reportTable/reportDetails/:report_id',//want route parameter to fetch report info when moving between pages
    component: ReportDetailsComponent,
  },
];
