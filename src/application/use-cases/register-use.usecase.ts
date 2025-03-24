import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserDomainService } from 'src/domain/services/user.service';
import { User } from 'src/domain/entities/user.entity';
import { RegisterUserDto } from '../dtos/register-user.dto';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const user = await this.userDomainService.createUser(
      dto.name,
      dto.email,
      dto.password,
    );
    return await this.userRepository.create(user);
  }
}
