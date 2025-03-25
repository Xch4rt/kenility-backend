import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProductRepository } from 'src/domain/repositories/product.repository.interface';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<any>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    await createdProduct.save();
    return createdProduct.toJSON();
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productModel.findById(id).exec();
    return product ? product.toJSON() : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map((p) => p.toJSON());
  }

  async update(product: Product): Promise<Product> {
    await this.productModel.findByIdAndUpdate(product.id, product);
    return product;
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id);
  }
}
