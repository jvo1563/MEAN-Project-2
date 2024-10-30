import { Test, TestingModule } from '@nestjs/testing';
import { ReportStatusController } from './report_status.controller';
import { ReportStatusService } from './report_status.service';

describe('ReportStatusController', () => {
  let controller: ReportStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportStatusController],
      providers: [ReportStatusService],
    }).compile();

    controller = module.get<ReportStatusController>(ReportStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
