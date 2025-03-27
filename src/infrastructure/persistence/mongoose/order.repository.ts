import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IOrderRepository } from 'src/domain/repositories/order.repository.interface';
import { Order } from 'src/domain/entities/order.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@InjectModel('Order') private readonly orderModel: Model<any>) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.orderModel({
      userId: order.userId,
      total: order.total,
      products: order.products.map((product) => product.id),
      createdAt: order.createdAt,
    });
    await createdOrder.save();
    return createdOrder.toJSON();
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.orderModel
      .findById(id)
      .populate('products')
      .exec();
    return order ? order.toJSON() : null;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().populate('products').exec();
    return orders.map((o) => o.toJSON());
  }

  async update(order: Order): Promise<Order> {
    await this.orderModel.findByIdAndUpdate(order.id, {
      clientId: order.userId,
      total: order.total,
      products: order.products.map((product) => product.id),
    });
    return order;
  }

  async delete(id: string): Promise<void> {
    await this.orderModel.findByIdAndDelete(id);
  }

  async getTotalSoldInLastMonth(): Promise<number> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const result = await this.orderModel.aggregate([
      { $match: { createdAt: { $gte: oneMonthAgo } } },
      { $group: { _id: null, totalSold: { $sum: '$total' } } },
    ]);
    return result.length > 0 ? result[0].totalSold : 0;
  }

  async getHighestAmountOrder(): Promise<Order | null> {
    const order = await this.orderModel
      .findOne()
      .sort({ total: -1 })
      .populate('products')
      .exec();
    return order ? order.toJSON() : null;
  }
}
