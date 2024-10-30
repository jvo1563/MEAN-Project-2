import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Get()
  @HttpCode(200)
  getAllReport(): Promise<any[]> {
    return this.service.getAllReport();
  }

  @Get(':id')
  @HttpCode(200)
  getReportById(@Param('id') id: number): Promise<any> {
    return this.service.getReportById(id);
  }

  @Post()
  @HttpCode(201)
  createReport(@Body() report: any): Promise<any> {
    return this.service.createReport(report);
  }

  @Put(':id')
  @HttpCode(200)
  updateReport(@Param('id') id: number, @Body() report: any): Promise<any> {
    return this.service.updateReport(id, report);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('id') id: number): Promise<void> {
    return this.service.deleteReport(id);
  }
}
