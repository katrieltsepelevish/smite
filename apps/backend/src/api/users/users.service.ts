import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  protected readonly _logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this._usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already taken.');
    }

    const user = this._usersRepository.create(createUserDto);
    return this._usersRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this._usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      this._logger.warn('User not found with email:', email);
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  public async getUser(id: string): Promise<User> {
    const user = await this._usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      this._logger.warn('User not found with id:', id);
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
