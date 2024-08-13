import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user: User = await this._usersService.findByEmail(email);

      const isMatch: boolean = Bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Password does not match.');
      }

      return user;
    } catch (err) {
      throw new BadRequestException('User not found.');
    }
  }

  async register(user: CreateUserDto): Promise<User> {
    await this._validateCreateUser(user);

    const hashedPassword = await Bcrypt.hash(user.password, 10);
    const newUser: CreateUserDto = { ...user, password: hashedPassword };
    const createdUser: User = await this._usersService.createUser(newUser);

    return createdUser;
  }

  private async _validateCreateUser(user: CreateUserDto) {
    try {
      await this._usersService.findByEmail(user.email);
    } catch (err) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }
}
