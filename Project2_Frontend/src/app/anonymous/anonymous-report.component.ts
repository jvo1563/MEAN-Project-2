import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AnonymousReport } from '../models/anonymous-report';

@Component({
  selector: 'app-anonymous-report',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './anonymous-report.component.html',
  styleUrl: './anonymous-report.component.css'
})
export class AnonymousReportComponent {
  report: AnonymousReport = new AnonymousReport(0,0,'','','','','',new Date());

  submitReport(){
    this.report.status = "Preliminary"
    console.log(this.report);
  }
}
