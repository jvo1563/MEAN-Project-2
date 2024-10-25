import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportCategoryService {
  create(createReportCategoryDto) {
    return 'This action adds a new reportCategory';
  }

  findAll() {
    return `This action returns all reportCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportCategory`;
  }

  update(id: number, updateReportCategoryDto) {
    return `This action updates a #${id} reportCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportCategory`;
  }
}
