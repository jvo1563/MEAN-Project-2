import { Annotation } from "./annotation";

export class AnnotationInfo {
    report_id:number;
    annotations: Annotation[];

    constructor(report_id:number, annotations:Annotation[]){
        this.report_id = report_id;
        this.annotations = annotations;
    }
}
