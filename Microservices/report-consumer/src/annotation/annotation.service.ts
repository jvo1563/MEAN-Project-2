import { HttpStatus, Injectable } from '@nestjs/common';
import { Annotation } from 'src/models/annotation';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AnnotationService {
  constructor(
    @InjectRepository(Annotation) private repo: Repository<Annotation>,
  ) {}

  async getAllAnnotation(): Promise<Annotation[]> {
    return await this.repo.find();
  }

  async getAnnotationById(id: number): Promise<Annotation> {
    return await this.repo
      .findOne({ where: { id } })
      .then((annotation) => {
        if (!annotation)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Annotation not found',
          });
        return annotation;
      })
      .catch((error) => {
        if (error instanceof RpcException) throw error;
        // If given ID param is invalid (not a number)
        if (error.code == '22P02')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid Request',
          });
        // Unexpected Error
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        });
      });
  }

  async createAnnotation(annotation: Annotation): Promise<Annotation> {
    delete annotation.id;
    return this.repo
      .save(annotation)
      .then((newAnnotation) => {
        return newAnnotation;
      })
      .catch((error) => {
        // If request is missing required fields to create
        if (error.code == '23502')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Missing required fields',
          });
        if (error.code == '23503')
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            message: 'Foreign key constraint failed',
          });
        if (error.code == '22P02')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid Request',
          });
        // Unexpected Error
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        });
      });
  }

  async updateAnnotation(
    id: number,
    updateAnnotation: Annotation,
  ): Promise<Annotation> {
    // Prevent changing ID
    if (updateAnnotation.id && updateAnnotation.id != id)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cannot change ID',
      });
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((annotation) => {
        if (!annotation)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Annotation not found',
          });
        return this.repo.save({ ...annotation, ...updateAnnotation });
      })
      .catch((error) => {
        if (error instanceof RpcException) throw error;
        if (error.code == '23503')
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            message: 'Foreign key constraint failed',
          });
        if (error.code == '22P02')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Invalid Request',
          });
        // Unexpected Error
        throw new RpcException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        });
      });
  }

  async deleteAnnotation(id: number) {
    return this.repo.delete(id).catch((error) => {
      // If given ID param is invalid (not a number)
      if (error.code == '22P02')
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid Request',
        });
      // Unexpected Error
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      });
    });
  }
}
