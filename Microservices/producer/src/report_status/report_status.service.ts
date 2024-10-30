import { Injectable } from '@nestjs/common';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
export class ReportStatusService {
  constructor(private rabbitService: RabbitService) {}

  // Get all reportStatuss
  async getAllReportStatus(): Promise<any[]> {
    return await this.rabbitService.sendToReportConsumer(
      'getAllReportStatus',
      {},
    );
  }

  // Get reportStatus by ID
  async getReportStatusById(id: number): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'getReportStatusById',
      id,
    );
  }

  // Create new reportStatus
  async createReportStatus(reportStatus: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'createReportStatus',
      reportStatus,
    );
  }

  // Update a reportStatus
  async updateReportStatus(id: number, updatedReportStatus: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer('updateReportStatus', {
      id,
      updatedReportStatus,
    });
  }

  // Delete a reportStatus
  async deleteReportStatus(id: number): Promise<void> {
    return await this.rabbitService.sendToReportConsumer(
      'deleteReportStatus',
      id,
    );
  }
}
