import { Module } from '@nestjs/common';
import { ReportStatusService } from './report_status.service';
import { ReportStatusController } from './report_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportStatus } from 'src/models/report_status';

@Module({
  imports: [TypeOrmModule.forFeature([ReportStatus])],
  exports: [TypeOrmModule],
  controllers: [ReportStatusController],
  providers: [ReportStatusService],
})
export class ReportStatusModule {}
