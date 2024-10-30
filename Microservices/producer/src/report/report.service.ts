import { Injectable } from '@nestjs/common';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
export class ReportService {
  constructor(private rabbitService: RabbitService) {}

  // Get all reports
  async getAllReport(): Promise<any[]> {
    return await this.rabbitService.sendToReportConsumer('getAllReport', {});
  }

  // Get report by ID
  async getReportById(id: number): Promise<any> {
    return await this.rabbitService.sendToReportConsumer('getReportById', id);
  }

  // Create new report
  async createReport(report: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'createReport',
      report,
    );
  }

  // Update a report
  async updateReport(id: number, updatedReport: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer('updateReport', {
      id,
      updatedReport,
    });
  }

  // Delete a report
  async deleteReport(id: number): Promise<void> {
    return await this.rabbitService.sendToReportConsumer('deleteReport', id);
  }
}
