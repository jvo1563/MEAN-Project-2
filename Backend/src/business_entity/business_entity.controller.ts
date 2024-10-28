import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { BusinessEntityService } from './business_entity.service';
import { BusinessEntity } from './business_entity';
import { DeleteResult } from 'typeorm';

@Controller('business-entity')
export class BusinessEntityController {
  constructor(private readonly businessEntityService: BusinessEntityService) {}

  @Post()
  @HttpCode(201)
  create(@Body() businessEntity: BusinessEntity) {
    return this.businessEntityService.create(businessEntity);
  }

  @Get()
  @HttpCode(200)
  findAll(): Promise<BusinessEntity[]> {
    return this.businessEntityService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number): Promise<BusinessEntity> {
    return this.businessEntityService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id') id: number,
    @Body() updateBusinessEntity: BusinessEntity,
  ): Promise<BusinessEntity> {
    return this.businessEntityService.update(+id, updateBusinessEntity);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.businessEntityService.remove(+id);
  }
}
