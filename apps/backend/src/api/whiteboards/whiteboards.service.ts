import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import shortid from 'shortid';

import { Whiteboard } from './whiteboard.entity';
import { User } from '../users/user.entity';
import { UpdateWhiteboardDto } from './dto/update-whiteboard.dto';

@Injectable()
export class WhiteboardsService {
  protected readonly _logger: Logger;

  constructor(
    @InjectRepository(Whiteboard)
    private readonly _whiteboardsRepository: Repository<Whiteboard>,
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
    private readonly _dataSource: DataSource,
  ) {}

  public async createWhiteboard(ownerId: string): Promise<Whiteboard> {
    const owner = await this._usersRepository.findOne({
      where: { id: ownerId },
    });

    if (!owner) {
      throw new NotFoundException('User not found.');
    }

    const createdWhiteboard = this._whiteboardsRepository.create({
      name: 'Untitled',
      token: shortid.generate(),
      ownerId: owner.id,
      users: [owner],
    });

    return this._whiteboardsRepository.save(createdWhiteboard);
  }

  public async getWhiteboardByToken(
    token: string,
    userId: string,
  ): Promise<Whiteboard> {
    const user = await this._usersRepository.findOne({
      where: { id: userId },
      relations: ['whiteboards'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { token },
      relations: ['notes', 'users'],
    });

    if (!whiteboard) {
      throw new NotFoundException('Whiteboard not found.');
    }

    const hasJoinedWhiteboard = whiteboard.users.some(
      (user) => user.id === userId,
    );

    if (!hasJoinedWhiteboard) {
      throw new BadRequestException(
        'You do not have access to this whiteboard. Please ensure you have joined the whiteboard or contact support if you believe this is an error.',
      );
    }

    return whiteboard;
  }

  public async getWhiteboardsByUserId(userId: string): Promise<Whiteboard[]> {
    const user = await this._usersRepository.findOne({
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
    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { token },
      relations: ['users'],
    });

    if (!whiteboard) {
      throw new NotFoundException('Whiteboard not found.');
    }

    const user = await this._usersRepository.findOne({
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
    return this._whiteboardsRepository.save(whiteboard);
  }

  public async removeWhiteboard(id: string, userId: string): Promise<void> {
    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!whiteboard) {
      throw new NotFoundException('Whiteboard not found.');
    }

    const user = await this._usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (whiteboard.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this whiteboard.',
      );
    }

    await this._whiteboardsRepository.delete(id);
  }

  public async updateWhiteboard(
    id: string,
    updateWhiteboardDto: UpdateWhiteboardDto,
  ): Promise<Whiteboard> {
    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { id },
    });

    if (!whiteboard) {
      throw new NotFoundException('Whiteboard not found.');
    }

    Object.assign(whiteboard, updateWhiteboardDto);

    return this._whiteboardsRepository.save(whiteboard);
  }
}
