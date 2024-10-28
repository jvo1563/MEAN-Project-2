import { Module } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationController } from './annotation.controller';
import { Annotation } from './annotation';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Annotation])],
  exports: [TypeOrmModule],
  providers: [AnnotationService],
  controllers: [AnnotationController],
})
export class AnnotationModule {}
