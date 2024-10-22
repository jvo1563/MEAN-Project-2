import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AnonymousReport } from '../models/anonymous-report';

@Component({
  selector: 'app-anonymous',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './anonymous.component.html',
  styleUrl: './anonymous.component.css'
})
export class AnonymousComponent {
  report: AnonymousReport = new AnonymousReport(0,0,'','','','','',new Date());

  submitReport(){
    this.report.status = "Preliminary"
    console.log(this.report);
  }
}
