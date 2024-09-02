"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
const order_schema_1 = require("./schemas/order.schema");
let OrderService = class OrderService {
    constructor(orderModel, cacheManager) {
        this.orderModel = orderModel;
        this.cacheManager = cacheManager;
    }
    async createOrder(createOrderDto) {
        const order = new this.orderModel(createOrderDto);
        const productIdsAsStrings = createOrderDto.productIds.map((id) => id.toString());
        const productDetails = await this.getProductDetails(productIdsAsStrings);
        order.totalPrice = this.calculateTotalPrice(productDetails, createOrderDto.quantities);
        return order.save();
    }
    async updateOrder(id, updateOrderDto) {
        var _a;
        const existingOrder = await this.orderModel
            .findByIdAndUpdate(id, updateOrderDto, { new: true })
            .exec();
        if (!existingOrder) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        const productIdsAsStrings = (_a = updateOrderDto.productIds) === null || _a === void 0 ? void 0 : _a.map((id) => id.toString());
        if (productIdsAsStrings) {
            await this.invalidateProductCache(productIdsAsStrings);
        }
        return existingOrder;
    }
    async getOrder(id) {
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async getAllOrders() {
        return this.orderModel.find().exec();
    }
    async getProductDetails(productIds) {
        const cachedDetails = await this.cacheManager.get(`product-details-${productIds.join(',')}`);
        if (cachedDetails && Array.isArray(cachedDetails)) {
            return cachedDetails;
        }
        const productDetails = await this.fetchProductDetailsFromService(productIds);
        await this.cacheManager.set(`product-details-${productIds.join(',')}`, productDetails, 600);
        return productDetails;
    }
    async invalidateProductCache(productIds) {
        await this.cacheManager.del(`product-details-${productIds.join(',')}`);
    }
    calculateTotalPrice(productDetails, quantities) {
        return productDetails.reduce((total, product, index) => total + product.price * quantities[index], 0);
    }
    async fetchProductDetailsFromService(productIds) {
        return productIds.map((id) => ({ id, price: 100 }));
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], OrderService);
//# sourceMappingURL=order-service.service.js.map