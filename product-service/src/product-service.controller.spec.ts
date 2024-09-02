import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product-service.controller';
import { ProductService } from './product-service.service';

describe('ProductServiceController', () => {
  let productServiceController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productServiceController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('should return "All Products!"', () => {
      expect(productServiceController.getAllProducts()).toBe([
        {
          _id: '66d473c05c6b9cd2c40537ce',
          name: 'Cadillac',
          description: 'special car',
          price: 60000,
          ownerId: '66d470056ba8b464bc208cbd',
          createdAt: '2024-09-01T14:01:36.039Z',
          updatedAt: '2024-09-01T14:01:36.051Z',
          __v: 0,
          id: '66d473c05c6b9cd2c40537ce',
        },
      ]);
    });
  });
});
