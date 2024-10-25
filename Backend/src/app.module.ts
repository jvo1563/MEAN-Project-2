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
      entities: [Annotation, Report, User],
      synchronize: false,
    }),
    UserModule,
    AnnotationModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
