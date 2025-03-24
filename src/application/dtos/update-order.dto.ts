import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsArray()
  productIds?: string[];
}
