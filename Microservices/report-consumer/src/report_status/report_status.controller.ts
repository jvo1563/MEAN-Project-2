import { Controller, HttpCode } from '@nestjs/common';
import { ReportStatusService } from './report_status.service';
import { ReportStatus } from 'src/models/report_status';
import { DeleteResult } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('report-status')
export class ReportStatusController {
  constructor(private readonly service: ReportStatusService) {}
  @MessagePattern('getAllReportStatus')
  getAllReportStatus(): Promise<ReportStatus[]> {
    return this.service.getAllReportStatus();
  }

  @MessagePattern('getReportStatusById')
  @HttpCode(200)
  getReportStatusById(@Payload() id: number): Promise<ReportStatus> {
    return this.service.getReportStatusById(id);
  }

  @MessagePattern('createReportStatus')
  @HttpCode(201)
  createReportStatus(
    @Payload() reportStatus: ReportStatus,
  ): Promise<ReportStatus> {
    return this.service.createReportStatus(reportStatus);
  }

  @MessagePattern('updateReportStatus')
  @HttpCode(200)
  updateReportStatus(@Payload() payload: Object): Promise<ReportStatus> {
    const id: number = payload['id'];
    const updatedReportStatus: ReportStatus = payload['updatedReportStatus'];
    return this.service.updateReportStatus(id, updatedReportStatus);
  }

  @MessagePattern('deleteReportStatus')
  @HttpCode(204)
  deleteReportStatus(@Payload() id: number): Promise<DeleteResult> {
    return this.service.deleteReportStatus(id);
  }
}
