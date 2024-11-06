import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enabling CORS with whitelist of allowed origins from environment variables
  app.enableCors({
    origin: process.env.CORS_WHITELIST.split(','),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
