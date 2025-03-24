import { IOrderRepository } from 'src/domain/repositories/order.repository.interface';

export class GetTotalSoldPriceUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<number> {
    return await this.orderRepository.getTotalSoldInLastMonth();
  }
}
