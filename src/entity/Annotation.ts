import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { User } from "./User";
import { Report } from "./Report";

@Entity()
export class Annotation {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ManyToOne(() => User, user => user.reports)
    user: User;

    @ManyToOne(() => Report, report => report.annotations)
    reports: Report;

    @Column({type: "text"})
    @IsString()
    @IsNotEmpty()
    annotation: string;

    @Column({type: "timestamp"})
    @IsString()
    @IsNotEmpty()
    created_at: Timestamp;


    constructor(id: number, annotation: string, created_at: Timestamp) {
        this.id = id;
        this.annotation = annotation;
        this.created_at = created_at;
        
    }

}