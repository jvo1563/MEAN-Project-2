export class Report {
    id: number;
    userId: number;
    title: string;
    description: string;
    location: string;
    category: string;
    status: string;
    created_at: Date;

    constructor(id:number, userId:number, title:string, description:string, location:string, category:string, status:string, created_at:Date){
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.category = category;
        this.status = status;
        this.created_at = created_at;
    }
}
