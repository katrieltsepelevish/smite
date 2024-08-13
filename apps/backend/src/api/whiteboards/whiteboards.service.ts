import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import shortid from 'shortid';

import { Whiteboard } from './whiteboard.entity';
import { User } from '../users/user.entity';

@Injectable()
export class WhiteboardsService {
  protected readonly _logger: Logger;

  constructor(
    @InjectRepository(Whiteboard)
    private readonly _whiteboardRepository: Repository<Whiteboard>,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  public async createWhiteboard(ownerId: string): Promise<Whiteboard> {
    const owner = await this._userRepository.findOne({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new NotFoundException('User not found.');
    }

    const createdWhiteboard = this._whiteboardRepository.create({
      name: 'Untitled',
      token: shortid.generate(),
      ownerId: owner.id,
      users: [owner],
    });

    return this._whiteboardRepository.save(createdWhiteboard);
  }

  public async getWhiteboard(id: string): Promise<Whiteboard> {
    const whiteboard = await this._whiteboardRepository.findOne({
      where: { id: id },
      relations: ['notes'],
    });

    if (!whiteboard) {
      throw new NotFoundException('Whiteboard not found.');
    }

    return whiteboard;
  }

  public async getWhiteboardsByUserId(userId: string): Promise<Whiteboard[]> {
    const user = await this._userRepository.findOne({
      where: { id: userId },
      relations: ['whiteboards'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.whiteboards;
  }

  public async joinWhiteboard(
    token: string,
    userId: string,
  ): Promise<Whiteboard> {
    const whiteboard = await this._whiteboardRepository.findOne({
      where: { token },
      relations: ['users'],
    });

    if (!whiteboard) {
      throw new NotFoundException('Whiteboard not found.');
    }

    const user = await this._userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isUserAlreadyInWhiteboard = whiteboard.users.some(
      ({ id }) => id === user.id,
    );

    if (isUserAlreadyInWhiteboard) {
      throw new ConflictException('User already joined the whiteboard.');
    }

    whiteboard.users.push(user);
    return this._whiteboardRepository.save(whiteboard);
  }
}
