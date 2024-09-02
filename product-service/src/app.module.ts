import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductServiceModule } from './product-service.module'; // Example for owner-service

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://mongodb:27017/crimmitdb`),
    ProductServiceModule,
  ],
})
export class AppModule {}
