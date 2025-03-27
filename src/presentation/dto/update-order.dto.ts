import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsArray()
  productIds?: string[];
}
