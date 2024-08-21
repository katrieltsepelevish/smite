import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { UserNotFoundException } from '../users/exceptions/user-not-found.exception';
import { PasswordMismatchException } from '../users/exceptions/password-mismatch.exception';
import { EmailAlreadyTakenException } from '../users/exceptions/email-already-taken.exception';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const user: User = await this._usersService.findByEmail(email);

      const isMatch: boolean = Bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new PasswordMismatchException();
      }

      return user;
    } catch (err) {
      throw new UserNotFoundException();
    }
  }

  async register({ email, password, ...rest }: CreateUserDto): Promise<User> {
    await this._validateCreateUser({ email });

    const hashedPassword = await Bcrypt.hash(password, 10);
    const newUser: CreateUserDto = { ...rest, email, password: hashedPassword };
    const createdUser: User = await this._usersService.createUser(newUser);

    return createdUser;
  }

  private async _validateCreateUser({ email }: { email: string }) {
    try {
      await this._usersService.findByEmail(email);
    } catch (err) {
      return;
    }

    throw new EmailAlreadyTakenException();
  }
}
