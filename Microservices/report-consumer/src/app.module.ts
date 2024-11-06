import { Module } from '@nestjs/common';
import { User } from './models/user';
import { Report } from './models/report';
import { Annotation } from './models/annotation';
import { BusinessEntity } from './models/business_entity';
import { ReportCategory } from './models/report_category';
import { ReportStatus } from './models/report_status';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnotationModule } from './annotation/annotation.module';
import { BusinessEntityModule } from './business_entity/business_entity.module';
import { ReportCategoryModule } from './report_category/report_category.module';
import { ReportModule } from './report/report.module';
import { ReportStatusModule } from './report_status/report_status.module';
require('dotenv').config();

@Module({
  imports: [
    // Connecting to the PostgreSQL database using TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Report,
        Annotation,
        BusinessEntity,
        ReportCategory,
        ReportStatus,
      ],
      synchronize: false,
    }),
    AnnotationModule,
    BusinessEntityModule,
    ReportCategoryModule,
    ReportModule,
    ReportStatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
