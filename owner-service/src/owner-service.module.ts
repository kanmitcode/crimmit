import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerService } from './owner-service.service';
import { OwnerController } from './owner-service.controller';
import { Owner, OwnerSchema } from './schemas/owner.schema';
import { OwnerGrpcController } from './owner.grpc.server';
import { RabbitMQConfig } from './rabbitmq.config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
    RabbitMQConfig,
  ],
  controllers: [OwnerController, OwnerGrpcController],
  providers: [OwnerService],
})
export class OwnerServiceModule {}
