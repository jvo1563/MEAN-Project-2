import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportIdService {

  constructor() { }

  reportIdSubject = new BehaviorSubject<number>(0);

  reportIdObservable = this.reportIdSubject.asObservable();

  setReportId(reportId:number){
    this.reportIdSubject.next(reportId);
  }
}
