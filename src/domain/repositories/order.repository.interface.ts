import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;

  getTotalSoldInLastMonth(): Promise<number>;
  getHighestAmountOrder(): Promise<Order | null>;
}
