import { Controller, HttpCode } from '@nestjs/common';
import { ReportService } from './report.service';
import { Report } from 'src/models/report';
import { DeleteResult } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('report')
export class ReportController {
  constructor(private readonly service: ReportService) {}
  @MessagePattern('getAllReport')
  getAllReport(): Promise<Report[]> {
    return this.service.getAllReport();
  }

  @MessagePattern('getReportById')
  @HttpCode(200)
  getReportById(@Payload() id: number): Promise<Report> {
    return this.service.getReportById(id);
  }

  @MessagePattern('createReport')
  @HttpCode(201)
  createReport(@Payload() report: Report): Promise<Report> {
    return this.service.createReport(report);
  }

  @MessagePattern('updateReport')
  @HttpCode(200)
  updateReport(@Payload() payload: Object): Promise<Report> {
    const id: number = payload['id'];
    const updatedReport: Report = payload['updatedReport'];
    return this.service.updateReport(id, updatedReport);
  }

  @MessagePattern('deleteReport')
  @HttpCode(204)
  deleteReport(@Payload() id: number): Promise<DeleteResult> {
    return this.service.deleteReport(id);
  }
}
