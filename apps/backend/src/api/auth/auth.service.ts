import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

import { UserDocument } from '../users/users.schema';
import { UsersService } from '../users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    try {
      const user: UserDocument = await this._usersService.findOneByEmail(email);

      const isMatch: boolean = Bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Password does not match.');
      }

      return user;
    } catch (err) {
      throw new BadRequestException('User not found.');
    }
  }

  async register(user: RegisterRequestDto): Promise<UserDocument> {
    await this._validateCreateUser(user);

    const hashedPassword = await Bcrypt.hash(user.password, 10);
    const newUser: CreateUserDto = { ...user, password: hashedPassword };
    const createdUser: UserDocument = await this._usersService.create(newUser);

    return createdUser;
  }

  private async _validateCreateUser(user: RegisterRequestDto) {
    try {
      await this._usersService.findOneByEmail(user.email);
    } catch (err) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }
}
