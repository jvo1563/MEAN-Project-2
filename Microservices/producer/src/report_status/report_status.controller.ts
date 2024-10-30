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
import { ReportStatusService } from './report_status.service';

@Controller('report-status')
export class ReportStatusController {
  constructor(private service: ReportStatusService) {}

  @Get()
  @HttpCode(200)
  getAllReportStatus(): Promise<any[]> {
    return this.service.getAllReportStatus();
  }

  @Get(':id')
  @HttpCode(200)
  getReportStatusById(@Param('id') id: number): Promise<any> {
    return this.service.getReportStatusById(id);
  }

  @Post()
  @HttpCode(201)
  createReportStatus(@Body() reportStatus: any): Promise<any> {
    return this.service.createReportStatus(reportStatus);
  }

  @Put(':id')
  @HttpCode(200)
  updateReportStatus(
    @Param('id') id: number,
    @Body() reportStatus: any,
  ): Promise<any> {
    return this.service.updateReportStatus(id, reportStatus);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReportStatus(@Param('id') id: number): Promise<void> {
    return this.service.deleteReportStatus(id);
  }
}
