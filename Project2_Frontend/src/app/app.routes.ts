import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnonymousComponent } from './anonymous/anonymous.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLandingComponent } from './user-landing/user-landing.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'anonymous',
        component:AnonymousComponent
    },
    {
        path:'login',
        component:UserLoginComponent
    },
    {
        path:'userLanding',
        component:UserLandingComponent
    }
];
