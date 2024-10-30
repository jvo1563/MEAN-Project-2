import { Controller, HttpCode } from '@nestjs/common';
import { ReportCategoryService } from './report_category.service';
import { ReportCategory } from 'src/models/report_category';
import { DeleteResult } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('report-category')
export class ReportCategoryController {
  constructor(private readonly service: ReportCategoryService) {}
  @MessagePattern('getAllReportCategory')
  getAllReportCategory(): Promise<ReportCategory[]> {
    return this.service.getAllReportCategory();
  }

  @MessagePattern('getReportCategoryById')
  @HttpCode(200)
  getReportCategoryById(@Payload() id: number): Promise<ReportCategory> {
    return this.service.getReportCategoryById(id);
  }

  @MessagePattern('createReportCategory')
  @HttpCode(201)
  createReportCategory(
    @Payload() reportCategory: ReportCategory,
  ): Promise<ReportCategory> {
    return this.service.createReportCategory(reportCategory);
  }

  @MessagePattern('updateReportCategory')
  @HttpCode(200)
  updateReportCategory(@Payload() payload: Object): Promise<ReportCategory> {
    const id: number = payload['id'];
    const updatedReportCategory: ReportCategory =
      payload['updatedReportCategory'];
    return this.service.updateReportCategory(id, updatedReportCategory);
  }

  @MessagePattern('deleteReportCategory')
  @HttpCode(204)
  deleteReportCategory(@Payload() id: number): Promise<DeleteResult> {
    return this.service.deleteReportCategory(id);
  }
}
