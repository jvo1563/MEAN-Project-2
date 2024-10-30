import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  providers: [ReportService, RabbitService],
  controllers: [ReportController],
})
export class ReportModule {}
