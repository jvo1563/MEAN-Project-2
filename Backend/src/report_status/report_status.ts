import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Report } from 'src/report/report';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportStatus {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  status_name: string;

  @OneToMany(() => Report, (report) => report.status)
  reports: Report[];
}
