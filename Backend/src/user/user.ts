import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from 'src/report/report';
import { Annotation } from 'src/annotation/annotation';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  role: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Annotation, (annotation) => annotation.user)
  annotations: Annotation[];

  //   constructor(id: number, username: string, password: string, role: string) {
  //     this.id = id;
  //     this.username = username;
  //     this.password = password;
  //     this.role = role;
  //   }
}
