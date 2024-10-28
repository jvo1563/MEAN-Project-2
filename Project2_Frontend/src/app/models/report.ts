export class Report {
    id: number;
    user_id: number;
    title: string;
    description: string;
    location: string;
    category: string;
    status: string;
    created_at: Date;

    constructor(id:number, user_id:number, title:string, description:string, location:string, category:string, status:string, created_at:Date){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.category = category;
        this.status = status;
        this.created_at = created_at;
    }
}
