import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @IsOptional()
  @IsString()
  picture_url?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;
}
