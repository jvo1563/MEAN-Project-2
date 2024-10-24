import { Component } from '@angular/core';
import { AnonymousReportComponent } from '../anonymous/anonymous-report.component';

@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [AnonymousReportComponent],
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.css'
})
export class UserReportComponent {
  
}
