import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import shortid from 'shortid';

import { Whiteboard } from '../whiteboard.entity';
import { User } from '../../users/user.entity';
import { UserNotFoundException } from '../../users/exceptions/user-not-found.exception';

@Injectable()
export class WhiteboardsService {
  protected readonly _logger: Logger;

  constructor(
    @InjectRepository(Whiteboard)
    private readonly _whiteboardsRepository: Repository<Whiteboard>,
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
  ) {}

  public async createWhiteboard({
    ownerId,
  }: {
    ownerId: string;
  }): Promise<Whiteboard> {
    const owner = await this._usersRepository.findOne({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new UserNotFoundException();
    }

    const newWhiteboard = this._whiteboardsRepository.create({
      name: 'Untitled',
      token: shortid.generate(),
      ownerId: owner.id,
      users: [owner],
    });

    return this._whiteboardsRepository.save(newWhiteboard);
  }

  public async getWhiteboardsByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Whiteboard[]> {
    const user = await this._usersRepository.findOne({
      where: { id: userId },
      relations: ['whiteboards'],
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user.whiteboards;
  }
}
