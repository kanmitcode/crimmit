import { Controller, Post, Put, Get, Param, Body } from '@nestjs/common';
import { OrderService } from './order-service.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrder(id);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
}
