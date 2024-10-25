import { Injectable } from '@nestjs/common';
@Injectable()
export class ReportStatusService {
  create(createReportStatusDto) {
    return 'This action adds a new reportStatus';
  }

  findAll() {
    return `This action returns all reportStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reportStatus`;
  }

  update(id: number, updateReportStatusDto) {
    return `This action updates a #${id} reportStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} reportStatus`;
  }
}
