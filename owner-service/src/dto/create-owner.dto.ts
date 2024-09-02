import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  firstName: string | undefined;

  @IsString()
  lastName: string | undefined;

  @IsEmail()
  email: string | undefined;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
