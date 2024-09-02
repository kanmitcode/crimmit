import { Model } from 'mongoose';
import { Cache } from 'cache-manager';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderService {
    private orderModel;
    private cacheManager;
    constructor(orderModel: Model<OrderDocument>, cacheManager: Cache);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    getOrder(id: string): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    private getProductDetails;
    private invalidateProductCache;
    private calculateTotalPrice;
    private fetchProductDetailsFromService;
}
