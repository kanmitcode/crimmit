import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product-service.service';
import { ProductController } from './product-service.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductGrpcController } from './product.grpc.server';
import { RabbitMQConfig } from './rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: 'src/proto/product.proto',
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    RabbitMQConfig,
  ],
  controllers: [ProductController, ProductGrpcController],
  providers: [ProductService],
})
export class ProductServiceModule {}
