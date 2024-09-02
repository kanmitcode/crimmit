import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { OwnerServiceModule } from './owner-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'owner',
      protoPath: join(__dirname, '../src/proto/owner.proto'),
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
