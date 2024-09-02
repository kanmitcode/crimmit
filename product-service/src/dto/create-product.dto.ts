import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string | undefined;

  @IsString()
  @IsOptional()
  description: string | undefined;

  @IsNumber()
  @IsNotEmpty()
  price: number | undefined;

  @IsNotEmpty()
  ownerId!: Types.ObjectId;
}
