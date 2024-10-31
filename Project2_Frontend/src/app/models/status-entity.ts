export class StatusEntity {
    id: number;
    status_name: string;

    constructor(id:number, status_name:string){
        this.id = id;
        this.status_name =status_name;
    }
}
