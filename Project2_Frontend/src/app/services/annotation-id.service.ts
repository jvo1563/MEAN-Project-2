import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnotationIdService {

  constructor() { }

  annotationIdSubject = new BehaviorSubject<number>(0);

  annotationIdObservable = this.annotationIdSubject.asObservable();

  setAnnotationId(annotationId: number){
    this.annotationIdSubject.next(annotationId);
  }
}
