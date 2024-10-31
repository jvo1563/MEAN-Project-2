import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnnotationInfo } from '../models/annotation-info';

@Injectable({
  providedIn: 'root'
})
export class AnnotationInfoService {

  constructor() { }

  annotationInfoSubject = new BehaviorSubject<AnnotationInfo>(new AnnotationInfo(0,[]));

  annotationInfoObservable = this.annotationInfoSubject.asObservable();

  setAnnotation(annotationInfo:AnnotationInfo){
    this.annotationInfoSubject.next(annotationInfo);
  }
}
