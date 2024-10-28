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
import { ReportStatusService } from './report_status.service';
import { ReportStatus } from './report_status';
import { DeleteResult } from 'typeorm';

@Controller('report-status')
export class ReportStatusController {
  constructor(private readonly reportStatusService: ReportStatusService) {}

  @Post()
  @HttpCode(201)
  create(@Body() reportStatus: ReportStatus): Promise<ReportStatus> {
    return this.reportStatusService.create(reportStatus);
  }

  @Get()
  @HttpCode(200)
  findAll(): Promise<ReportStatus[]> {
    return this.reportStatusService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number): Promise<ReportStatus> {
    return this.reportStatusService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id') id: number,
    @Body() updateReportStatus: ReportStatus,
  ): Promise<ReportStatus> {
    return this.reportStatusService.update(+id, updateReportStatus);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.reportStatusService.remove(+id);
  }
}
