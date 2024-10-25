import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Report } from '../models/report';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonymous-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './anonymous-report.component.html',
  styleUrl: './anonymous-report.component.css'
})
export class AnonymousReportComponent {
  constructor(private router:Router){}
  report: Report = new Report(0,0,'','','','','',new Date());

  submitReport(){
    this.report.status = "Preliminary"
    console.log(this.report);
    this.router.navigate([''])
  }
}
