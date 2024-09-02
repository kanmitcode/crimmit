"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const order_service_controller_1 = require("./order-service.controller");
const order_service_service_1 = require("./order-service.service");
describe('OrderServiceController', () => {
    let orderServiceController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [order_service_controller_1.OrderController],
            providers: [order_service_service_1.OrderService],
        }).compile();
        orderServiceController = app.get(order_service_controller_1.OrderController);
    });
    describe('root', () => {
        it('should return "All Orders!"', () => {
            expect(orderServiceController.getAllOrders()).toBe('All Orders!');
        });
    });
});
//# sourceMappingURL=order-service.controller.spec.js.map