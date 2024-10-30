import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  providers: [AnnotationService, RabbitService],
  controllers: [AnnotationController],
})
export class AnnotationModule {}
