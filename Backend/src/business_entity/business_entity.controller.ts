import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessEntityService } from './business_entity.service';

@Controller('business-entity')
export class BusinessEntityController {
  constructor(private readonly businessEntityService: BusinessEntityService) {}

  @Post()
  create(@Body() createBusinessEntityDto) {
    return this.businessEntityService.create(createBusinessEntityDto);
  }

  @Get()
  findAll() {
    return this.businessEntityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessEntityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessEntityDto) {
    return this.businessEntityService.update(+id, updateBusinessEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessEntityService.remove(+id);
  }
}
