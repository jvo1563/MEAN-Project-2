import { Injectable } from '@nestjs/common';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
export class BusinessEntityService {
  constructor(private rabbitService: RabbitService) {}

  // Get all businessEntitys
  async getAllBusinessEntity(): Promise<any[]> {
    return await this.rabbitService.sendToReportConsumer(
      'getAllBusinessEntity',
      {},
    );
  }

  // Get businessEntity by ID
  async getBusinessEntityById(id: number): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'getBusinessEntityById',
      id,
    );
  }

  // Create new businessEntity
  async createBusinessEntity(businessEntity: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'createBusinessEntity',
      businessEntity,
    );
  }

  // Update a businessEntity
  async updateBusinessEntity(
    id: number,
    updatedBusinessEntity: any,
  ): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'updateBusinessEntity',
      {
        id,
        updatedBusinessEntity,
      },
    );
  }

  // Delete a businessEntity
  async deleteBusinessEntity(id: number): Promise<void> {
    return await this.rabbitService.sendToReportConsumer(
      'deleteBusinessEntity',
      id,
    );
  }
}
