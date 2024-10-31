export class UserEntity {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    picture:string;
    role: string;
    created_at:Date;

    constructor(id:number, email:string, first_name:string, last_name:string, picture:string, role:string, created_at:Date){
        this.id=id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.picture = picture;
        this.role = role;
        this.created_at = created_at;
    }
}
