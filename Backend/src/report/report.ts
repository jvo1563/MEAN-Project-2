import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @Column({ type: 'int' })
  @IsNumber()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  location: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  category: string;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  status: string;

  @Column({ type: 'timestamp' })
  created_at: Timestamp;

  @ManyToOne(() => User, (user) => user.reports, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
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
