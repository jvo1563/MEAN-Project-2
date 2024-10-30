import { Module } from '@nestjs/common';
import { ReportStatusService } from './report_status.service';
import { ReportStatusController } from './report_status.controller';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  controllers: [ReportStatusController],
  providers: [ReportStatusService, RabbitService],
})
export class ReportStatusModule {}
