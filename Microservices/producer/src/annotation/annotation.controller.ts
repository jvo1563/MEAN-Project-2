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
import { AnnotationService } from './annotation.service';

@Controller('annotation')
export class AnnotationController {
  constructor(private service: AnnotationService) {}

  @Get()
  @HttpCode(200)
  getAllAnnotation(): Promise<any[]> {
    return this.service.getAllAnnotation();
  }

  @Get(':id')
  @HttpCode(200)
  getAnnotationById(@Param('id') id: number): Promise<any> {
    return this.service.getAnnotationById(id);
  }

  @Post()
  @HttpCode(201)
  createAnnotation(@Body() annotation: any): Promise<any> {
    return this.service.createAnnotation(annotation);
  }

  @Put(':id')
  @HttpCode(200)
  updateAnnotation(
    @Param('id') id: number,
    @Body() annotation: any,
  ): Promise<any> {
    return this.service.updateAnnotation(id, annotation);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAnnotation(@Param('id') id: number): Promise<void> {
    return this.service.deleteAnnotation(id);
  }
}
