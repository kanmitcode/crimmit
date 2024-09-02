import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  ownerId?: Types.ObjectId;
}
