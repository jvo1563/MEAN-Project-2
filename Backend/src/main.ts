import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_WHITELIST.split(',')
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
