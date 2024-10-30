import { Controller, HttpCode } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { Annotation } from 'src/models/annotation';
import { DeleteResult } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('annotation')
export class AnnotationController {
  constructor(private readonly service: AnnotationService) {}
  @MessagePattern('getAllAnnotation')
  getAllAnnotation(): Promise<Annotation[]> {
    return this.service.getAllAnnotation();
  }

  @MessagePattern('getAnnotationById')
  @HttpCode(200)
  getAnnotationById(@Payload() id: number): Promise<Annotation> {
    return this.service.getAnnotationById(id);
  }

  @MessagePattern('createAnnotation')
  @HttpCode(201)
  createAnnotation(@Payload() annotation: Annotation): Promise<Annotation> {
    return this.service.createAnnotation(annotation);
  }

  @MessagePattern('updateAnnotation')
  @HttpCode(200)
  updateAnnotation(@Payload() payload: Object): Promise<Annotation> {
    const id: number = payload['id'];
    const updatedAnnotation: Annotation = payload['updatedAnnotation'];
    return this.service.updateAnnotation(id, updatedAnnotation);
  }

  @MessagePattern('deleteAnnotation')
  @HttpCode(204)
  deleteAnnotation(@Payload() id: number): Promise<DeleteResult> {
    return this.service.deleteAnnotation(id);
  }
}
