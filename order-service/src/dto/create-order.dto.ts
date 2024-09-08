import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsString()
  orderId: string | undefined;

  @IsArray()
  @IsNotEmpty({ each: true })
  productIds!: Types.ObjectId[];

  @IsArray()
  @IsNotEmpty({ each: true })
  quantities!: number[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number | undefined;
}
