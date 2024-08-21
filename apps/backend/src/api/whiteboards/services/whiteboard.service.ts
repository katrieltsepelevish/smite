import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Whiteboard } from '../whiteboard.entity';
import { User } from '../../users/user.entity';
import { UpdateWhiteboardDto } from '../dto/update-whiteboard.dto';
import { UserNotFoundException } from '../../users/exceptions/user-not-found.exception';
import { WhiteboardNotFoundException } from '../exceptions/whiteboard-not-found.exception';
import { WhiteboardAccessDeniedException } from '../exceptions/whiteboard-acess-denied.exception';
import { WhiteboardUserAlreadyJoinedException } from '../exceptions/whiteboard-user-already-joined.exception';
import { WhiteboardDeletePermissionsException } from '../exceptions/whiteboard-delete-permissions.exception';

@Injectable()
export class WhiteboardService {
  protected readonly _logger: Logger;

  constructor(
    @InjectRepository(Whiteboard)
    private readonly _whiteboardsRepository: Repository<Whiteboard>,
    @InjectRepository(User)
    private readonly _usersRepository: Repository<User>,
  ) {}

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
