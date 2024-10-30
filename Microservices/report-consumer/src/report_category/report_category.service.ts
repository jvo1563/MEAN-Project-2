import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportCategory } from 'src/models/report_category';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReportCategoryService {
  constructor(
    @InjectRepository(ReportCategory) private repo: Repository<ReportCategory>,
  ) {}

  async getAllReportCategory(): Promise<ReportCategory[]> {
    return await this.repo.find();
  }

  async getReportCategoryById(id: number): Promise<ReportCategory> {
    return await this.repo
      .findOne({ where: { id } })
      .then((reportCategory) => {
        if (!reportCategory)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Report Category not found',
          });
        return reportCategory;
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

  async createReportCategory(
    reportCategory: ReportCategory,
  ): Promise<ReportCategory> {
    delete reportCategory.id;
    return this.repo
      .save(reportCategory)
      .then((newReportCategory) => {
        return newReportCategory;
      })
      .catch((error) => {
        // If request is missing required fields to create
        if (error.code == '23502')
          throw new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Missing required fields',
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

  async updateReportCategory(
    id: number,
    updateReportCategory: ReportCategory,
  ): Promise<ReportCategory> {
    // Prevent changing ID
    if (updateReportCategory.id && updateReportCategory.id != id)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cannot change ID',
      });
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((reportCategory) => {
        if (!reportCategory)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Report Category not found',
          });
        return this.repo.save({ ...reportCategory, ...updateReportCategory });
      })
      .catch((error) => {
        if (error instanceof RpcException) throw error;
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

  async deleteReportCategory(id: number) {
    return this.repo.delete(id).catch((error) => {
      // If given ID param is invalid (not a number)
      if (error.code == '22P02')
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid Request',
        });
      // Deleting something that is restricted by foreign key
      if (error.code == '23503')
        throw new RpcException({
          status: HttpStatus.CONFLICT,
          message: error.detail,
        });
      // Unexpected Error
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      });
    });
  }
}
