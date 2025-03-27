import { IOrderRepository } from 'src/domain/repositories/order.repository.interface';
import { IProductRepository } from 'src/domain/repositories/product.repository.interface';
import { Order } from 'src/domain/entities/order.entity';
import { Product } from 'src/domain/entities/product.entity';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { Inject } from '@nestjs/common';

export class UpdateOrderUseCase {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findById(dto.orderId);
    if (!order) {
      throw new Error('Orden no encontrada');
    }
    if (dto.userId) {
      order.userId = dto.userId;
    }
    if (dto.productIds && dto.productIds.length > 0) {
      const products: Product[] = [];
      for (const id of dto.productIds) {
        const product = await this.productRepository.findById(id);
        if (!product) {
          throw new Error(`Producto con ID ${id} no encontrado`);
        }
        products.push(product);
      }
      order.products = products;
      order.total = products.reduce((sum, p) => sum + p.price, 0);
    }
    return await this.orderRepository.update(order);
  }
}
