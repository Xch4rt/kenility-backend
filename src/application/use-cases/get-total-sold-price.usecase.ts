import { Inject } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/repositories/order.repository.interface';

export class GetTotalSoldPriceUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(): Promise<number> {
    return await this.orderRepository.getTotalSoldInLastMonth();
  }
}
