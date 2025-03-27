import { Inject } from '@nestjs/common';
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository.interface';

export class GetProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const product = await this.productRepository.findAll();
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }
}
