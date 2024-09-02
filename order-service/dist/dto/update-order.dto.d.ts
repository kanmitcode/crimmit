import { Types } from 'mongoose';
export declare class UpdateOrderDto {
    orderId?: string;
    productIds?: Types.ObjectId[];
    quantities?: number[];
    totalPrice?: number;
}
