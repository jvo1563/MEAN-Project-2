import { Controller, HttpCode } from '@nestjs/common';
import { BusinessEntityService } from './business_entity.service';
import { BusinessEntity } from 'src/models/business_entity';
import { DeleteResult } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('business-entity')
export class BusinessEntityController {
  constructor(private readonly service: BusinessEntityService) {}
  @MessagePattern('getAllBusinessEntity')
  getAllBusinessEntity(): Promise<BusinessEntity[]> {
    return this.service.getAllBusinessEntity();
  }

  @MessagePattern('getBusinessEntityById')
  @HttpCode(200)
  getBusinessEntityById(@Payload() id: number): Promise<BusinessEntity> {
    return this.service.getBusinessEntityById(id);
  }

  @MessagePattern('createBusinessEntity')
  @HttpCode(201)
  createBusinessEntity(
    @Payload() BusinessEntity: BusinessEntity,
  ): Promise<BusinessEntity> {
    return this.service.createBusinessEntity(BusinessEntity);
  }

  @MessagePattern('updateBusinessEntity')
  @HttpCode(200)
  updateBusinessEntity(@Payload() payload: Object): Promise<BusinessEntity> {
    const id: number = payload['id'];
    const updatedBusinessEntity: BusinessEntity =
      payload['updatedBusinessEntity'];
    return this.service.updateBusinessEntity(id, updatedBusinessEntity);
  }

  @MessagePattern('deleteBusinessEntity')
  @HttpCode(204)
  deleteBusinessEntity(@Payload() id: number): Promise<DeleteResult> {
    return this.service.deleteBusinessEntity(id);
  }
}
