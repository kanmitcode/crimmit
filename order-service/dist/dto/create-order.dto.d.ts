import { Types } from 'mongoose';
export declare class CreateOrderDto {
    orderId: string | undefined;
    productIds: Types.ObjectId[];
    quantities: number[];
    totalPrice: number | undefined;
}
