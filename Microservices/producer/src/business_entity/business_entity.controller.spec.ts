import { Test, TestingModule } from '@nestjs/testing';
import { BusinessEntityController } from './business_entity.controller';
import { BusinessEntityService } from './business_entity.service';

describe('BusinessEntityController', () => {
  let controller: BusinessEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessEntityController],
      providers: [BusinessEntityService],
    }).compile();

    controller = module.get<BusinessEntityController>(BusinessEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
