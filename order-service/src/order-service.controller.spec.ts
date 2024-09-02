import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order-service.controller';
import { OrderService } from './order-service.service';

describe('OrderServiceController', () => {
  let orderServiceController: OrderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderServiceController = app.get<OrderController>(OrderController);
  });

  describe('root', () => {
    it('should return "All Orders!"', () => {
      expect(orderServiceController.getAllOrders()).toBe('All Orders!');
    });
  });
});
