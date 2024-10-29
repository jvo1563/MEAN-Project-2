import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

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
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  last_name: string;

  @Column({ type: 'text' })
  @IsString()
  @IsNotEmpty()
  picture: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  role: string;

  @Column({ type: 'timestamp' })
  created_at: Timestamp;
}
