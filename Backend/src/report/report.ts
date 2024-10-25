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
import { BusinessEntity } from 'src/business_entity/business_entity';
import { ReportCategory } from 'src/report_category/report_category';
import { ReportStatus } from 'src/report_status/report_status';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ type: 'int' })
  @IsNumber()
  created_by: number;

  @Column({ type: 'int' })
  @IsNumber()
  assigned_to: number;

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

  @Column({ type: 'int' })
  @IsNumber()
  category_id: number;

  @Column({ type: 'int' })
  @IsNumber()
  status_id: number;

  @Column({ type: 'timestamp' })
  created_at: Timestamp;

  @Column({ type: 'timestamp' })
  updated_at: Timestamp;

  @ManyToOne(() => User, (user) => user.created_reports, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'created_by' })
  user_created: User;

  @ManyToOne(() => User, (user) => user.assigned_reports, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'assigned_to' })
  user_assigned: User;

  @OneToMany(() => Annotation, (annotation) => annotation.report, {
    eager: true,
  })
  annotations: Annotation[];

  @OneToMany(() => BusinessEntity, (businessEntity) => businessEntity.report, {
    eager: true,
  })
  business_entities: BusinessEntity[];

  @ManyToOne(() => ReportCategory, (reportCategory) => reportCategory.reports, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: ReportCategory;

  @ManyToOne(() => ReportStatus, (reportStatus) => reportStatus.reports, {
    eager: true,
  })
  @JoinColumn({ name: 'status_id' })
  status: ReportStatus;
}
