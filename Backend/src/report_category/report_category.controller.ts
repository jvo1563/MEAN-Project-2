import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ReportCategoryService } from './report_category.service';
import { ReportCategory } from './report_category';
import { DeleteResult } from 'typeorm';

@Controller('report-category')
export class ReportCategoryController {
  constructor(private readonly reportCategoryService: ReportCategoryService) {}

  @Post()
  @HttpCode(201)
  create(@Body() reportCategory: ReportCategory): Promise<ReportCategory> {
    return this.reportCategoryService.create(reportCategory);
  }

  @Get()
  @HttpCode(200)
  findAll(): Promise<ReportCategory[]> {
    return this.reportCategoryService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number): Promise<ReportCategory> {
    return this.reportCategoryService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id') id: number,
    @Body() updateReportCategory: ReportCategory,
  ): Promise<ReportCategory> {
    return this.reportCategoryService.update(+id, updateReportCategory);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.reportCategoryService.remove(+id);
  }
}
