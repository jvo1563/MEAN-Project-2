export class BuisnessEntity {
    id: number;
    report_id: number;
    name: string;
    industry: string;
    address: string;
    email: string;
    phone: string;
    relation:string;

    constructor(id:number, report_id:number, name:string, industry:string, address:string, email:string, phone:string, relation:string){
        this.id=id;
        this.name = name;
        this.industry = industry;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.relation = relation;
        this.report_id = report_id;
    }
}
