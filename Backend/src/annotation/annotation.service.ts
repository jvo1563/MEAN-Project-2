import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Annotation } from './annotation';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnnotationService {
  constructor(
    @InjectRepository(Annotation) private repo: Repository<Annotation>,
  ) {}

  async create(annotation: Annotation): Promise<Annotation> {
    delete annotation.id;
    return this.repo
      .save(annotation)
      .then((newAnnotation) => {
        return newAnnotation;
      })
      .catch((error) => {
        // If request is missing required fields to create
        if (error.code == '23502')
          throw new HttpException(
            'Missing required fields',
            HttpStatus.BAD_REQUEST,
          );
        if (error.code == '23503')
          throw new HttpException(
            'Foreign key constraint failed',
            HttpStatus.CONFLICT,
          );
        // Unexpected Error
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findAll(): Promise<Annotation[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<Annotation> {
    return await this.repo
      .findOne({ where: { id } })
      .then((annotation) => {
        if (!annotation)
          throw new HttpException('Annotation not found', HttpStatus.NOT_FOUND);
        return annotation;
      })
      .catch((error) => {
        if (error instanceof HttpException) throw error;
        // If given ID param is invalid (not a number)
        if (error.code == '22P02')
          throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
        // Unexpected Error
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async update(id: number, updateAnnotation: Annotation): Promise<Annotation> {
    // Prevent changing ID
    if (updateAnnotation.id && updateAnnotation.id != id)
      throw new HttpException('Cannot change ID', HttpStatus.BAD_REQUEST);
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((annotation) => {
        if (!annotation)
          throw new HttpException('Annotation not found', HttpStatus.NOT_FOUND);
        return this.repo.save({ ...annotation, ...updateAnnotation });
      })
      .catch((error) => {
        if (error instanceof HttpException) throw error;
        if (error.code == '23503')
          throw new HttpException(
            'Foreign key constraint failed',
            HttpStatus.CONFLICT,
          );
        // Unexpected Error
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async remove(id: number) {
    return this.repo.delete(id).catch((error) => {
      // If given ID param is invalid (not a number)
      if (error.code == '22P02')
        throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
      // Unexpected Error
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
