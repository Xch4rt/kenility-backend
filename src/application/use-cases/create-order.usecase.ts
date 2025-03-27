import { IProductRepository } from 'src/domain/repositories/product.repository.interface';
import { IOrderRepository } from 'src/domain/repositories/order.repository.interface';
import { OrderDomainService } from 'src/domain/services/order.service';
import { Order } from 'src/domain/entities/order.entity';
import { Product } from 'src/domain/entities/product.entity';
import { CreateOrderDto } from 'src/application/dtos/create-order.dto';
import { Inject } from '@nestjs/common';

export class CreateOrderUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    private readonly orderDomainService: OrderDomainService,
  ) {}

  async execute(dto: CreateOrderDto): Promise<Order> {
    const products: Product[] = [];
    for (const id of dto.productIds) {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      products.push(product);
    }
    const order = this.orderDomainService.createOrder(dto.userId, products);
    return await this.orderRepository.create(order);
  }
}
