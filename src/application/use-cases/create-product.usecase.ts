import { Inject } from '@nestjs/common';
import { CreateProductDto } from 'src/application/dtos/create-product.dto';
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository.interface';
import { v4 as uuidv4 } from 'uuid';
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const product = new Product(
      uuidv4(),
      dto.name,
      dto.sku,
      dto.stock,
      dto.picture_url ?? '',
      dto.price,
    );

    return this.productRepository.create(product);
  }
}
