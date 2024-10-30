import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/models/report';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  // Get all reports
  async getAllReport(): Promise<Report[]> {
    return await this.repo.find();
  }

  // Get report by ID
  async getReportById(id: number): Promise<Report> {
    return this.repo
      .findOne({ where: { id: id } })
      .then((report) => {
        if (!report)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Report not found',
          });
        return report;
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

  // Create new report
  async createReport(report: Report): Promise<Report> {
    delete report.id;
    return this.repo
      .save(report)
      .then((newReport) => {
        return newReport;
      })
      .catch((error) => {
        // If report already exists - shouldn't happen because we delete ID field
        if (error.code == '23505')
          throw new RpcException({
            status: HttpStatus.CONFLICT,
            message: 'Report already exists',
          });
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

  // Update a report
  async updateReport(id: number, updatedReport: Report): Promise<Report> {
    // Prevent changing ID
    if (updatedReport.id && updatedReport.id != id)
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Cannot change ID',
      });

    // Update report if they exist
    return this.repo
      .findOne({ where: { id }, loadEagerRelations: false })
      .then((report) => {
        if (!report)
          throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Report not found',
          });
        return this.repo.save({ ...report, ...updatedReport });
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

  // Deleting a report
  async deleteReport(id: number) {
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
