import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import shortid from 'shortid';

import { Whiteboard } from './whiteboard.entity';
import { User } from '../users/user.entity';
import { UserNotFoundException } from '../users/exceptions/user-not-found.exception';
import { WhiteboardDeletePermissionsException } from './exceptions/whiteboard-delete-permissions.exception';
import { UpdateWhiteboardDto } from './dto/update-whiteboard.dto';
import { WhiteboardNotFoundException } from './exceptions/whiteboard-not-found.exception';
import { WhiteboardUserAlreadyJoinedException } from './exceptions/whiteboard-user-already-joined.exception';
import { WhiteboardAccessDeniedException } from './exceptions/whiteboard-acess-denied.exception';

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
      order: { whiteboards: { createdAt: 'DESC' } },
      relations: ['whiteboards'],
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user.whiteboards;
  }

  public async getWhiteboardByToken({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }): Promise<Whiteboard> {
    const user = await this._usersRepository.findOne({
      where: { id: userId },
      relations: ['whiteboards'],
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { token },
      relations: ['notes', 'users'],
    });

    if (!whiteboard) {
      throw new WhiteboardNotFoundException();
    }

    const hasJoinedWhiteboard = whiteboard.users.some(
      (user) => user.id === userId,
    );

    if (!hasJoinedWhiteboard) {
      throw new WhiteboardAccessDeniedException();
    }

    return whiteboard;
  }

  public async joinWhiteboard({
    token,
    userId,
  }: {
    token: string;
    userId: string;
  }): Promise<Whiteboard> {
    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { token },
      relations: ['users'],
    });

    if (!whiteboard) {
      throw new WhiteboardNotFoundException();
    }

    const user = await this._usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (whiteboard.users.some((u) => u.id === user.id)) {
      throw new WhiteboardUserAlreadyJoinedException();
    }

    whiteboard.users.push(user);
    return this._whiteboardsRepository.save(whiteboard);
  }

  public async removeWhiteboard({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<void> {
    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!whiteboard) {
      throw new WhiteboardNotFoundException();
    }

    const user = await this._usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException();
    }

    if (whiteboard.ownerId !== userId) {
      throw new WhiteboardDeletePermissionsException();
    }

    await this._whiteboardsRepository.delete(id);
  }

  public async updateWhiteboard({
    id,
    updateWhiteboardDto,
  }: {
    id: string;
    updateWhiteboardDto: UpdateWhiteboardDto;
  }): Promise<Whiteboard> {
    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { id },
    });

    if (!whiteboard) {
      throw new WhiteboardNotFoundException();
    }

    Object.assign(whiteboard, updateWhiteboardDto);
    return this._whiteboardsRepository.save(whiteboard);
  }
}
