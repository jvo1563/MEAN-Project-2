import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportStatusService } from './report_status.service';

@Controller('report-status')
export class ReportStatusController {
  constructor(private readonly reportStatusService: ReportStatusService) {}

  @Post()
  create(@Body() createReportStatusDto) {
    return this.reportStatusService.create(createReportStatusDto);
  }

  @Get()
  findAll() {
    return this.reportStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportStatusDto) {
    return this.reportStatusService.update(+id, updateReportStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportStatusService.remove(+id);
  }
}
