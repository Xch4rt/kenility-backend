import { Product } from './product.entity';

export class Order {
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    public readonly id: string,
    public userId: string,
    public total: number,
    public products: Product[],
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (!userId) {
      throw new Error('User client is required to create an order');
    }

    if (total <= 0) {
      throw new Error('Total must be greater than 0');
    }

    if (products.length === 0) {
      throw new Error('Products are required');
    }

    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = updatedAt ? updatedAt : new Date();
  }
}
