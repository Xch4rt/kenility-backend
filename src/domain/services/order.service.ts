import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class OrderDomainService {
  public createOrder(userId: string, product: Product[]): Order {
    if (!product || product.length === 0) {
      throw new Error('Products are required');
    }

    const total = product.reduce((acc, current) => acc + current.price, 0);
    const id = uuidv4();
    return new Order(id, userId, total, product);
  }
}
