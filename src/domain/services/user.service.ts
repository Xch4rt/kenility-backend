import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class UserDomainService {
  public async validatePassword(
    user: User,
    plainPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, user.password);
  }

  public async createUser(
    name: string,
    email: string,
    plainPassword: string,
  ): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const id = uuidv4();

    return new User(id, name, email, hashedPassword);
  }
}
