import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AnnotationModule } from './annotation/annotation.module';
import { BusinessEntityModule } from './business_entity/business_entity.module';
import { ReportModule } from './report/report.module';
import { ReportCategoryModule } from './report_category/report_category.module';
import { ReportStatusModule } from './report_status/report_status.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule,
    AnnotationModule,
    BusinessEntityModule,
    ReportModule,
    ReportCategoryModule,
    ReportStatusModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
