import { Module } from '@nestjs/common';
import { ReportCategoryService } from './report_category.service';
import { ReportCategoryController } from './report_category.controller';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  controllers: [ReportCategoryController],
  providers: [ReportCategoryService, RabbitService],
})
export class ReportCategoryModule {}
