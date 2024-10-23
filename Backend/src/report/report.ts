import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { User } from 'src/user/user';
import { Annotation } from 'src/annotation/annotation';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  location: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  category: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  status: string;

  @Column({ type: 'timestamp' })
  created_at: Timestamp;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @OneToMany(() => Annotation, (annotation) => annotation.report)
  annotations: Annotation[];

  //   constructor(
  //     id: number,
  //     title: string,
  //     description: string,
  //     location: string,
  //     category: string,
  //     status: string,
  //     created_at: Timestamp,
  //   ) {
  //     this.id = id;
  //     this.title = title;
  //     this.description = description;
  //     this.location = location;
  //     this.category = category;
  //     this.status = status;
  //     this.created_at = created_at;
  //   }
}
