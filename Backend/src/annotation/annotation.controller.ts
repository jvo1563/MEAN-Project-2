import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { Annotation } from './annotation';
import { DeleteResult } from 'typeorm';

@Controller('annotation')
export class AnnotationController {
  constructor(private readonly annotationService: AnnotationService) {}
  @Post()
  @HttpCode(201)
  create(@Body() annotation: Annotation): Promise<Annotation> {
    return this.annotationService.create(annotation);
  }

  @Get()
  @HttpCode(200)
  findAll(): Promise<Annotation[]> {
    return this.annotationService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number): Promise<Annotation> {
    return this.annotationService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id') id: number,
    @Body() updateAnnotation: Annotation,
  ): Promise<Annotation> {
    return this.annotationService.update(+id, updateAnnotation);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.annotationService.remove(+id);
  }
}
