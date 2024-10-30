import { Module } from '@nestjs/common';
import { ReportCategoryService } from './report_category.service';
import { ReportCategoryController } from './report_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportCategory } from 'src/models/report_category';

@Module({
  imports: [TypeOrmModule.forFeature([ReportCategory])],
  exports: [TypeOrmModule],
  controllers: [ReportCategoryController],
  providers: [ReportCategoryService],
})
export class ReportCategoryModule {}
