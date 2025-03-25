import { Controller, Post, Get, Body, UseGuards, Put } from '@nestjs/common';
import { CreateOrderDto } from 'src/application/dtos/create-order.dto';
import { UpdateOrderDto } from 'src/application/dtos/update-order.dto';
import { CreateOrderUseCase } from 'src/application/use-cases/create-order.usecase';
import { UpdateOrderUseCase } from 'src/application/use-cases/update-order.usecase';
import { GetTotalSoldPriceUseCase } from 'src/application/use-cases/get-total-sold-price.usecase';
import { GetHighestAmountOrderUseCase } from 'src/application/use-cases/get-highest-amount-order.usecase';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly getTotalSoldPriceUseCase: GetTotalSoldPriceUseCase,
    private readonly getHighestAmountOrderUseCase: GetHighestAmountOrderUseCase,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.createOrderUseCase.execute(createOrderDto);
  }

  @Put()
  async update(@Body() updateOrderDto: UpdateOrderDto) {
    return await this.updateOrderUseCase.execute(updateOrderDto);
  }

  @Get('total-sold')
  async getTotalSold() {
    const total = await this.getTotalSoldPriceUseCase.execute();
    return { totalSold: total };
  }

  @Get('highest')
  async getHighest() {
    return await this.getHighestAmountOrderUseCase.execute();
  }
}
