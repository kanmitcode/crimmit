import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order-service.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://mongodb:27017/crimmitdb`),
    OrderModule,
  ],
})
export class AppModule {}
