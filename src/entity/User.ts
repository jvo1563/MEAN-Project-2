import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";
import { Annotation } from "./Annotation";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column({type: "varchar",
    length: 255})
    @IsString()
    @IsNotEmpty()
    username: string;

    @Column({type: "varchar",
        length: 255})
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column({type: "varchar",
        length: 50})
    @IsString()
    @IsNotEmpty()
    role: string;

    @OneToMany(() => Report, report => report.user)
    reports: Report[];

    @OneToMany(() => Annotation, annotation => annotation.user)
    annotations: Annotation[];

    constructor(id: number, username: string, password: string, role: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

}