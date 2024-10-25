export class Annotation {
    id: number;
    report_id: number;
    user_id: number;
    title: string;
    annotation: string;
    created_at: Date;

    constructor(id:number, report_id: number, user_id:number, title:string, annotation:string, created_at:Date){
        this.id = id;
        this.report_id = report_id;
        this.user_id = user_id;
        this.title = title;
        this.annotation = annotation;
        this.created_at = created_at;
    }
}
