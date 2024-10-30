import { HttpStatus, Injectable } from '@nestjs/common';
import { BusinessEntity } from 'src/models/business_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BusinessEntityService {
  constructor(
    @InjectRepository(BusinessEntity) private repo: Repository<BusinessEntity>,
  ) {}

  async getAllBusinessEntity(): Promise<BusinessEntity[]> {
    return await this.repo.find();
  }

  async getBusinessEntityById(id: number): Promise<BusinessEntity> {
    return await this.repo
      .findOne({ where: { id } })
      .then((businessEntity) => {
        if (!businessEntity)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Business Entity not found',
          });
        return businessEntity;
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

  async createBusinessEntity(
    businessEntity: BusinessEntity,
  ): Promise<BusinessEntity> {
    delete businessEntity.id;
    return this.repo
      .save(businessEntity)
      .then((newBusinessEntity) => {
        return newBusinessEntity;
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

  async updateBusinessEntity(
    id: number,
    updateBusinessEntity: BusinessEntity,
  ): Promise<BusinessEntity> {
    // Prevent changing ID
    if (updateBusinessEntity.id && updateBusinessEntity.id != id)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cannot change ID',
      });
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((businessEntity) => {
        if (!businessEntity)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Business Entity not found',
          });
        return this.repo.save({ ...businessEntity, ...updateBusinessEntity });
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

  async deleteBusinessEntity(id: number) {
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
