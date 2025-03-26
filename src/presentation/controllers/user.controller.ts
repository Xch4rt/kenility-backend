import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/application/use-cases/register-use.usecase';
import { LoginUserUseCase } from 'src/application/use-cases/login-user.usecase';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.registerUserUseCase.execute(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.loginUserUseCase.execute(loginUserDto);
  }
}
