import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BusinessEntityService } from './business_entity.service';

@Controller('business-entity')
export class BusinessEntityController {
  constructor(private service: BusinessEntityService) {}

  @Get()
  @HttpCode(200)
  getAllBusinessEntity(): Promise<any[]> {
    return this.service.getAllBusinessEntity();
  }

  @Get(':id')
  @HttpCode(200)
  getBusinessEntityById(@Param('id') id: number): Promise<any> {
    return this.service.getBusinessEntityById(id);
  }

  @Post()
  @HttpCode(201)
  createBusinessEntity(@Body() businessEntity: any): Promise<any> {
    return this.service.createBusinessEntity(businessEntity);
  }

  @Put(':id')
  @HttpCode(200)
  updateBusinessEntity(
    @Param('id') id: number,
    @Body() businessEntity: any,
  ): Promise<any> {
    return this.service.updateBusinessEntity(id, businessEntity);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteBusinessEntity(@Param('id') id: number): Promise<void> {
    return this.service.deleteBusinessEntity(id);
  }
}
