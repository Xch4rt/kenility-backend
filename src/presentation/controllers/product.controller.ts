import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CreateProductDto } from 'src/application/dtos/create-product.dto';
import { CreateProductUseCase } from 'src/application/use-cases/create-product.usecase';
import { GetProductUseCase } from 'src/application/use-cases/get-product.usecase';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.createProductUseCase.execute(createProductDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async get(@Param('id') id: string) {
    return await this.getProductUseCase.execute(id);
  }
}
