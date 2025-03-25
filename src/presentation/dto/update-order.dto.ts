import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsArray()
  productIds?: string[];
}
