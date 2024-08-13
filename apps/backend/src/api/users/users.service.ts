import { Injectable } from '@nestjs/common';

import { UsersRepository } from './users.respository';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  public async create(createUserDto: CreateUserDto) {
    return this._usersRepository.create(createUserDto);
  }

  public async findOneByEmail(email: string) {
    return this._usersRepository.findOne({ email });
  }

  public async getUser(getUserDto: GetUserDto) {
    return this._usersRepository.findOne(getUserDto);
  }
}
