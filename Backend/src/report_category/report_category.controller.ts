import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportCategoryService } from './report_category.service';

@Controller('report-category')
export class ReportCategoryController {
  constructor(private readonly reportCategoryService: ReportCategoryService) {}

  @Post()
  create(@Body() createReportCategoryDto) {
    return this.reportCategoryService.create(createReportCategoryDto);
  }

  @Get()
  findAll() {
    return this.reportCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportCategoryDto) {
    return this.reportCategoryService.update(+id, updateReportCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportCategoryService.remove(+id);
  }
}
