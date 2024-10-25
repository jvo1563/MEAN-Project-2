import { Test, TestingModule } from '@nestjs/testing';
import { ReportCategoryService } from './report_category.service';

describe('ReportCategoryService', () => {
  let service: ReportCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportCategoryService],
    }).compile();

    service = module.get<ReportCategoryService>(ReportCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
