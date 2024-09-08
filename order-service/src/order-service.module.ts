import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { OrderService } from './order-service.service';
import { OrderController } from './order-service.controller';
import { Order, OrderSchema } from './schemas/order.schema';
import { RedisClientOptions } from 'redis';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: 'src/proto/product.proto',
          url: 'product-service:50051',
        },
      },
    ]),
    CacheModule.register<RedisClientOptions>({
      store: 'redis',
      socket: {
        host: 'localhost',
        port: 6380,
      },
      ttl: 600,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
