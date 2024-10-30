import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from 'src/models/report';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  exports: [TypeOrmModule],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
