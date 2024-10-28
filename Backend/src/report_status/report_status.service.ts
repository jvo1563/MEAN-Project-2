import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportStatus } from './report_status';

@Injectable()
export class ReportStatusService {
  constructor(
    @InjectRepository(ReportStatus) private repo: Repository<ReportStatus>,
  ) {}

  async create(reportStatus: ReportStatus): Promise<ReportStatus> {
    delete reportStatus.id;
    return this.repo
      .save(reportStatus)
      .then((newReportStatus) => {
        return newReportStatus;
      })
      .catch((error) => {
        // If request is missing required fields to create
        if (error.code == '23502')
          throw new HttpException(
            'Missing required fields',
            HttpStatus.BAD_REQUEST,
          );
        // Unexpected Error
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findAll(): Promise<ReportStatus[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<ReportStatus> {
    return await this.repo
      .findOne({ where: { id } })
      .then((reportStatus) => {
        if (!reportStatus)
          throw new HttpException(
            'Report Status not found',
            HttpStatus.NOT_FOUND,
          );
        return reportStatus;
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
    updateReportStatus: ReportStatus,
  ): Promise<ReportStatus> {
    // Prevent changing ID
    if (updateReportStatus.id && updateReportStatus.id != id)
      throw new HttpException('Cannot change ID', HttpStatus.BAD_REQUEST);
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((reportStatus) => {
        if (!reportStatus)
          throw new HttpException(
            'Report Status not found',
            HttpStatus.NOT_FOUND,
          );
        return this.repo.save({ ...reportStatus, ...updateReportStatus });
      })
      .catch((error) => {
        if (error instanceof HttpException) throw error;
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
