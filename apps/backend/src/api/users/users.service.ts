import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { EmailAlreadyTakenException } from './exceptions/email-already-taken.exception';

@Injectable()
export class UsersService {
  protected readonly _logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
  ) {}

  public async createUser({ email, ...rest }: CreateUserDto): Promise<User> {
    const existingUser = await this._usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new EmailAlreadyTakenException();
    }

    const user = this._usersRepository.create({ email, ...rest });
    return this._usersRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this._usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      this._logger.warn('User not found with email:', email);
      throw new UserNotFoundException();
    }

    return user;
  }

  public async getUser({ id }: { id: string }): Promise<User> {
    const user = await this._usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      this._logger.warn('User not found with id:', id);
      throw new UserNotFoundException();
    }

    return user;
  }
}
