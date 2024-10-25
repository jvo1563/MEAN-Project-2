import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Report } from 'src/report/report';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportCategory {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  category_name: string;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @OneToMany(() => Report, (report) => report.category)
  reports: Report[];
}
