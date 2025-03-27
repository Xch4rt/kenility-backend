export class Product {
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    public readonly id: string,
    public name: string,
    public sku: string,
    public stock: number,
    public picture_url: string,
    public price: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (!name || !sku) {
      throw new Error('Name and SKU are required');
    }

    if (price <= 0) {
      throw new Error('Price must be greater than 0');
    }

    if (stock < 0) {
      throw new Error('Stock must be greater than or equal to 0');
    }

    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = updatedAt ? updatedAt : new Date();
  }
}
