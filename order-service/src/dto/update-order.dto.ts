import { IsArray, IsOptional, IsString, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  orderId?: string;

  @IsOptional()
  @IsArray()
  productIds?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  quantities?: number[];

  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}
