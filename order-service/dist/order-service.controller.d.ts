import { OrderService } from './order-service.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    getOrder(id: string): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
}
