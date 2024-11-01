import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import { ReportCategoryService } from './report_category.service';

@Controller('report-category')
export class ReportCategoryController {
  constructor(private service: ReportCategoryService) {}

  @SetMetadata('isPublic', true)
  @Get()
  @HttpCode(200)
  getAllReportCategory(): Promise<any[]> {
    return this.service.getAllReportCategory();
  }

  @SetMetadata('isPublic', true)
  @Get(':id')
  @HttpCode(200)
  getReportCategoryById(@Param('id') id: number): Promise<any> {
    return this.service.getReportCategoryById(id);
  }

  @Post()
  @HttpCode(201)
  createReportCategory(@Body() reportCategory: any): Promise<any> {
    return this.service.createReportCategory(reportCategory);
  }

  @Put(':id')
  @HttpCode(200)
  updateReportCategory(
    @Param('id') id: number,
    @Body() reportCategory: any,
  ): Promise<any> {
    return this.service.updateReportCategory(id, reportCategory);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReportCategory(@Param('id') id: number): Promise<void> {
    return this.service.deleteReportCategory(id);
  }
}
