import { Test, TestingModule } from '@nestjs/testing';
import { ReportCategoryController } from './report_category.controller';
import { ReportCategoryService } from './report_category.service';

describe('ReportCategoryController', () => {
  let controller: ReportCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportCategoryController],
      providers: [ReportCategoryService],
    }).compile();

    controller = module.get<ReportCategoryController>(ReportCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
