import { Injectable } from '@nestjs/common';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
export class AnnotationService {
  constructor(private rabbitService: RabbitService) {}

  // Get all annotations
  async getAllAnnotation(): Promise<any[]> {
    return await this.rabbitService.sendToReportConsumer(
      'getAllAnnotation',
      {},
    );
  }

  // Get annotation by ID
  async getAnnotationById(id: number): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'getAnnotationById',
      id,
    );
  }

  // Create new annotation
  async createAnnotation(annotation: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer(
      'createAnnotation',
      annotation,
    );
  }

  // Update a annotation
  async updateAnnotation(id: number, updatedAnnotation: any): Promise<any> {
    return await this.rabbitService.sendToReportConsumer('updateAnnotation', {
      id,
      updatedAnnotation,
    });
  }

  // Delete a annotation
  async deleteAnnotation(id: number): Promise<void> {
    return await this.rabbitService.sendToReportConsumer(
      'deleteAnnotation',
      id,
    );
  }
}
