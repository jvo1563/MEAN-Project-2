import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  // Get all reports
  async getAllReports(): Promise<Report[]> {
    return await this.repo.find();
  }

  // Get report by ID
  async getReportById(id: number): Promise<Report> {
    return this.repo
      .findOne({ where: { id: id } })
      .then((report) => {
        if (!report)
          throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
        return report;
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
          throw new HttpException('Report already exists', HttpStatus.CONFLICT);
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

  // Update a report
  async updateReport(id: number, updatedReport: Report): Promise<Report> {
    // Prevent changing ID
    if (updatedReport.id && updatedReport.id != id)
      throw new HttpException('Cannot change ID', HttpStatus.BAD_REQUEST);

    // Update report if they exist
    return this.repo
      .findOne({ where: { id }, loadEagerRelations: false })
      .then((report) => {
        if (!report)
          throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
        return this.repo.save({ ...report, ...updatedReport });
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

  // Deleting a report
  async deleteReport(id: number) {
    return this.repo.delete(id).catch((error) => {
      // If given ID param is invalid (not a number)
      if (error.code == '22P02')
        throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
      // Unexpected Error
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
