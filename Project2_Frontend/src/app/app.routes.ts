import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnonymousReportComponent } from './anonymous/anonymous-report.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserReportComponent } from './user-report/user-report.component';
import { ReportTableComponent } from './report-table/report-table.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'anonymous',
        component:AnonymousReportComponent
    },
    {
        path:'login',
        component:UserLoginComponent
    },
    {
        path:'userLanding',
        component:UserLandingComponent
    },
    {
        path:'userLanding/userReport',
        component:UserReportComponent
    },
    {
        path:'userLanding/reportTable',
        component:ReportTableComponent
    }
];
