import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from './report';
import { DeleteResult } from 'typeorm';

@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Get()
  @HttpCode(200)
  getAllReports(): Promise<Report[]> {
    return this.service.getAllReports();
  }

  @Get(':id')
  @HttpCode(200)
  getReportById(@Param('id') id: number): Promise<Report> {
    return this.service.getReportById(id);
  }

  @Post()
  @HttpCode(201)
  createReport(@Body() report: Report): Promise<Report> {
    return this.service.createReport(report);
  }

  @Put(':id')
  @HttpCode(200)
  updateReport(
    @Param('id') id: number,
    @Body() report: Report,
  ): Promise<Report> {
    return this.service.updateReport(id, report);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.deleteReport(id);
  }
}
