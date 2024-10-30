import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportStatus } from 'src/models/report_status';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReportStatusService {
  constructor(
    @InjectRepository(ReportStatus) private repo: Repository<ReportStatus>,
  ) {}

  async getAllReportStatus(): Promise<ReportStatus[]> {
    return await this.repo.find();
  }

  async getReportStatusById(id: number): Promise<ReportStatus> {
    return await this.repo
      .findOne({ where: { id } })
      .then((reportStatus) => {
        if (!reportStatus)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Report Status not found',
          });
        return reportStatus;
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
  async createReportStatus(reportStatus: ReportStatus): Promise<ReportStatus> {
    delete reportStatus.id;
    return this.repo
      .save(reportStatus)
      .then((newReportStatus) => {
        return newReportStatus;
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

  async updateReportStatus(
    id: number,
    updateReportStatus: ReportStatus,
  ): Promise<ReportStatus> {
    // Prevent changing ID
    if (updateReportStatus.id && updateReportStatus.id != id)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cannot change ID',
      });
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((reportStatus) => {
        if (!reportStatus)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Report Status not found',
          });
        return this.repo.save({ ...reportStatus, ...updateReportStatus });
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

  async deleteReportStatus(id: number) {
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
