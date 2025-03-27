import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
