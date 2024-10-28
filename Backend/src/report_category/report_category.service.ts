import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportCategory } from './report_category';

@Injectable()
export class ReportCategoryService {
  constructor(
    @InjectRepository(ReportCategory) private repo: Repository<ReportCategory>,
  ) {}

  async create(reportCategory: ReportCategory): Promise<ReportCategory> {
    delete reportCategory.id;
    return this.repo
      .save(reportCategory)
      .then((newReportCategory) => {
        return newReportCategory;
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

  async findAll(): Promise<ReportCategory[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<ReportCategory> {
    return await this.repo
      .findOne({ where: { id } })
      .then((reportCategory) => {
        if (!reportCategory)
          throw new HttpException(
            'Report Category not found',
            HttpStatus.NOT_FOUND,
          );
        return reportCategory;
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
    updateReportCategory: ReportCategory,
  ): Promise<ReportCategory> {
    // Prevent changing ID
    if (updateReportCategory.id && updateReportCategory.id != id)
      throw new HttpException('Cannot change ID', HttpStatus.BAD_REQUEST);
    // Update user if they exist
    return this.repo
      .findOne({ where: { id } })
      .then((reportCategory) => {
        if (!reportCategory)
          throw new HttpException(
            'Report Category not found',
            HttpStatus.NOT_FOUND,
          );
        return this.repo.save({ ...reportCategory, ...updateReportCategory });
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
