import { IOrderRepository } from 'src/domain/repositories/order.repository.interface';
import { Order } from 'src/domain/entities/order.entity';
import { Inject } from '@nestjs/common';

export class GetHighestAmountOrderUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(): Promise<Order> {
    const order = await this.orderRepository.getHighestAmountOrder();
    if (!order) {
      throw new Error('No se encontró ninguna orden');
    }
    return order;
  }
}
