import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';

@Module({
  providers: [AnnotationService],
  controllers: [AnnotationController]
})
export class AnnotationModule {}
