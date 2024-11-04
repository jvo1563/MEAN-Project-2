import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from './report';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Request } from 'express';

@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Get()
  @HttpCode(200)
  getAllReports(): Promise<Report[]> {
    return this.service.getAllReports();
  }

  @Get('assigned_to/:userid')
  @HttpCode(200)
  getReportsByAssignedId(@Param('userid') userid: number): Promise<Report[]> {
    return this.service.getReportsByAssignedId(userid);
  }

  @Get(':id')
  @HttpCode(200)
  getReportById(@Param('id') id: number): Promise<Report> {
    return this.service.getReportById(id);
  }

  @SetMetadata('isPublic', true)
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

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.deleteReport(id);
  }
}
