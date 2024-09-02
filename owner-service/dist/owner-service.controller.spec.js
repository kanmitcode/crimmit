"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const owner_service_controller_1 = require("./owner-service.controller");
const owner_service_service_1 = require("./owner-service.service");
describe('OwnerServiceController', () => {
    let ownerServiceController;
    beforeEach(async () => {
        const app = await testing_1.Test.createTestingModule({
            controllers: [owner_service_controller_1.OwnerController],
            providers: [owner_service_service_1.OwnerService],
        }).compile();
        ownerServiceController = app.get(owner_service_controller_1.OwnerController);
    });
    describe('root', () => {
        it('should return "All Owners!"', () => {
            expect(ownerServiceController.getAllOwners()).toBe('All Owners!');
        });
    });
});
//# sourceMappingURL=owner-service.controller.spec.js.map