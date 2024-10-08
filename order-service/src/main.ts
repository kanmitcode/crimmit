import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.startAllMicroservices();
  await app.listen(3003);
  Logger.log(`Order service is running on HTTP:3003 and gRPC:50051`);
}
bootstrap();
