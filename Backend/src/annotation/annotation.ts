import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { User } from 'src/user/user';
import { Report } from 'src/report/report';

@Entity()
export class Annotation {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  report_id: number;

  @Column({ type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  annotation: string;

  @Column({ type: 'timestamp' })
  @IsString()
  @IsNotEmpty()
  created_at: Timestamp;

  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'report_id' })
  user: User;

  @ManyToOne(() => Report, (report) => report.annotations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  report: Report;

  //   constructor(id: number, annotation: string, created_at: Timestamp) {
  //     this.id = id;
  //     this.annotation = annotation;
  //     this.created_at = created_at;
  //   }
}
