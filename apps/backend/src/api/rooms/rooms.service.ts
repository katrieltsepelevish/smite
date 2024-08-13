import { Injectable } from '@nestjs/common';

import { RoomsRepository } from './repositories/rooms.repository';
import { RoomUserRepository } from './repositories/room-user.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetUserRoomsDto } from './dto/get-user-rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    private readonly _roomsRepository: RoomsRepository,
    private readonly _roomUserRepository: RoomUserRepository
  ) {}

  public async create({ userId }: CreateRoomDto) {
    const createdRoom = await this._roomsRepository.create({
      name: 'Untitled',
    });

    await this._roomUserRepository.create({ userId, roomId: createdRoom._id });

    return createdRoom;
  }

  public async getUserRooms({ userId }: GetUserRoomsDto) {
    const roomUsers = await this._roomUserRepository.find({ userId });

    const roomIds = roomUsers.map((roomUser) => roomUser.roomId);

    return this._roomsRepository.find({ _id: { $in: roomIds } });
  }
}
