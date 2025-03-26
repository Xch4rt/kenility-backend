import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<any>) {}
  verify(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    await createdUser.save();
    return createdUser.toJSON();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? user.toJSON() : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  }

  async update(user: User): Promise<User> {
    await this.userModel.findByIdAndUpdate(user.id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
