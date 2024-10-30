import { Injectable } from '@nestjs/common';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
export class ReportCategoryService {
  constructor(private rabbitService: RabbitService) {}

  // Get all reportCategorys
  async getAllReportCategory(): Promise<any[]> {
    return await this.rabbitService.sendToReportConsumer(
      'getAllReportCategory',
      {},
    );
  }

  // Get reportCategory by ID
  async getReportCategoryById(id: number): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'getReportCategoryById',
      id,
    );
  }

  // Create new reportCategory
  async createReportCategory(reportCategory: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'createReportCategory',
      reportCategory,
    );
  }

  // Update a reportCategory
  async updateReportCategory(
    id: number,
    updatedReportCategory: any,
  ): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'updateReportCategory',
      {
        id,
        updatedReportCategory,
      },
    );
  }

  // Delete a reportCategory
  async deleteReportCategory(id: number): Promise<void> {
    return await this.rabbitService.sendToReportConsumer(
      'deleteReportCategory',
      id,
    );
  }
}
