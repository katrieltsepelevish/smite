import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { UsersRepository } from './users.respository';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  protected readonly _logger: Logger;

  constructor(private readonly _usersRepository: UsersRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this._usersRepository.create(createUserDto);
  }

  public async findOneByEmail(email: string): Promise<UserDocument> {
    const user = this._usersRepository.findOne({ email });

    if (!user) {
      this._logger.warn('User not found with email:', email);
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  public async getUser(getUserDto: GetUserDto): Promise<UserDocument> {
    const user = this._usersRepository.findOne(getUserDto);

    if (!user) {
      this._logger.warn('User not found with filterQuery:', getUserDto);
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
