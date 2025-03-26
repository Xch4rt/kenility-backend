import { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { UserDomainService } from 'src/domain/services/user.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface LoginUserUseCaseResponseType {
  accessToken: string;
  refreshToken: string;
  user: any;
}
export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly userDomainService: UserDomainService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginUserDto): Promise<LoginUserUseCaseResponseType> {
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

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const { password, ...userWithoutPassword } = user;
    return { accessToken, refreshToken, user: userWithoutPassword };
  }
}
