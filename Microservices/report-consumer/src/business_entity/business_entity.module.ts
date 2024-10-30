import { Module } from '@nestjs/common';
import { BusinessEntityService } from './business_entity.service';
import { BusinessEntityController } from './business_entity.controller';
import { BusinessEntity } from 'src/models/business_entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity])],
  exports: [TypeOrmModule],
  controllers: [BusinessEntityController],
  providers: [BusinessEntityService],
})
export class BusinessEntityModule {}
