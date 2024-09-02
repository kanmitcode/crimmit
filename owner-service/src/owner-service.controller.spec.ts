import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner-service.controller';
import { OwnerService } from './owner-service.service';

describe('OwnerServiceController', () => {
  let ownerServiceController: OwnerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [OwnerService],
    }).compile();

    ownerServiceController = app.get<OwnerController>(OwnerController);
  });

  describe('root', () => {
    it('should return "All Owners!"', () => {
      expect(ownerServiceController.getAllOwners()).toBe('All Owners!');
    });
  });
});
