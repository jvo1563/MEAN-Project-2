export class Report {
  id: number;
  created_by: number;
  assigned_to: number;
  title: string;
  description: string;
  location: string;
  category_id: number;
  status_id: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number = 0,
    created_by: number = 0,
    assigned_to: number = 0,
    title: string = '',
    description: string = '',
    location: string = '',
    category_id: number = 0,
    status_id: number = 0,
    created_at: Date = new Date(),
    updated_at: Date = new Date()
  ) {
    this.id = id;
    this.created_by = created_by;
    this.assigned_to = assigned_to;
    this.title = title;
    this.description = description;
    this.location = location;
    this.category_id = category_id;
    this.status_id = status_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
