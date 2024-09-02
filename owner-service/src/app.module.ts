import { RabbitMQConfig } from './rabbitmq.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerServiceModule } from './owner-service.module'; // Example for owner-service

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://mongodb:27017/crimmitdb`),
    RabbitMQConfig,
    OwnerServiceModule,
  ],
})
export class AppModule {}
