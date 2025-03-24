import { Product } from '../entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export class ProductDomainService {
  public createProduct(
    name: string,
    price: number,
    sku: string,
    picture_url: string,
  ): Product {
    const id = uuidv4();
    return new Product(id, name, sku, picture_url, price);
  }
}
