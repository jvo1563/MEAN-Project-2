import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BusinessEntity } from './business_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessEntityService {
  constructor(
    @InjectRepository(BusinessEntity) private repo: Repository<BusinessEntity>,
  ) {}

  async create(businessEntity: BusinessEntity): Promise<BusinessEntity> {
    delete businessEntity.id;
    return this.repo
      .save(businessEntity)
      .then((newBusinessEntity) => {
        return newBusinessEntity;
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

  async findAll(): Promise<BusinessEntity[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<BusinessEntity> {
    return await this.repo
      .findOne({ where: { id } })
      .then((businessEntity) => {
        if (!businessEntity)
          throw new HttpException(
            'Business Entity not found',
            HttpStatus.NOT_FOUND,
          );
        return businessEntity;
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

  async update(
    id: number,
    updateBusinessEntity: BusinessEntity,
  ): Promise<BusinessEntity> {
    // Prevent changing ID
    if (updateBusinessEntity.id && updateBusinessEntity.id != id)
      throw new HttpException('Cannot change ID', HttpStatus.BAD_REQUEST);
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((businessEntity) => {
        if (!businessEntity)
          throw new HttpException(
            'Business Entity not found',
            HttpStatus.NOT_FOUND,
          );
        return this.repo.save({ ...businessEntity, ...updateBusinessEntity });
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
