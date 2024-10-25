import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annotation } from './annotation/annotation';
import { Report } from './report/report';
import { User } from './user/user';
import { UserModule } from './user/user.module';
import { AnnotationModule } from './annotation/annotation.module';
import { ReportModule } from './report/report.module';
import { BusinessEntityModule } from './business_entity/business_entity.module';
import { ReportCategoryModule } from './report_category/report_category.module';
import { ReportStatusModule } from './report_status/report_status.module';
import { BusinessEntity } from './business_entity/business_entity';
import { ReportCategory } from './report_category/report_category';
import { ReportStatus } from './report_status/report_status';
require('dotenv').config();

@Module({
  imports: [
    // Set up TypeORM connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Annotation,
        Report,
        User,
        BusinessEntity,
        ReportCategory,
        ReportStatus,
      ],
      synchronize: false,
      // logging: true,
    }),
    UserModule,
    AnnotationModule,
    ReportModule,
    BusinessEntityModule,
    ReportCategoryModule,
    ReportStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
