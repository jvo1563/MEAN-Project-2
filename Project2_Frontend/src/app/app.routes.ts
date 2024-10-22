import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnonymousComponent } from './anonymous/anonymous.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'anonymous',
        component:AnonymousComponent
    }
];
