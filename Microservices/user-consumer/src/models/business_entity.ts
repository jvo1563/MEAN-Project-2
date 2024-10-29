import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from 'src/models/report';

@Entity()
export class BusinessEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  report_id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  industry: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  address: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  relation: string;

  @ManyToOne(() => Report, (report) => report.business_entities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: Report;
}
