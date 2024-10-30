import { Module } from '@nestjs/common';
import { BusinessEntityService } from './business_entity.service';
import { BusinessEntityController } from './business_entity.controller';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  controllers: [BusinessEntityController],
  providers: [BusinessEntityService, RabbitService],
})
export class BusinessEntityModule {}
