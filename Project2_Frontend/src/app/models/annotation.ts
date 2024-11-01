export class Annotation {
  id: number;
  report_id: number;
  created_by: number;
  title: string;
  annotation: string;
  created_at: Date;

  constructor(
    id: number = 0,
    report_id: number = 0,
    created_by: number = 0,
    title: string = '',
    annotation: string = '',
    created_at: Date = new Date()
  ) {
    this.id = id;
    this.report_id = report_id;
    this.created_by = created_by;
    this.title = title;
    this.annotation = annotation;
    this.created_at = created_at;
  }
}
