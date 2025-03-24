import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserDomainService } from 'src/domain/services/user.service';
import { User } from 'src/domain/entities/user.entity';
import { LoginUserDto } from '../dtos/login-user.dto';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(dto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await this.userDomainService.validatePassword(
      user,
      dto.password,
    );
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
}
