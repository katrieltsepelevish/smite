import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { RoomsRepository } from './repositories/rooms.repository';
import { RoomUserRepository } from './repositories/room-user.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetUserRoomsDto } from './dto/get-user-rooms.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  protected readonly _logger: Logger;

  constructor(
    private readonly _roomsRepository: RoomsRepository,
    private readonly _roomUserRepository: RoomUserRepository,
  ) {}

  public async createRoom({ userId }: CreateRoomDto): Promise<RoomDocument> {
    const createdRoom = await this._roomsRepository.create({
      name: 'Untitled',
    });

    await this._roomUserRepository.create({ userId, roomId: createdRoom._id });

    return createdRoom;
  }

  public async joinRoom({
    userId,
    roomId,
  }: JoinRoomDto): Promise<RoomDocument> {
    const room = await this._roomsRepository.findOne({ _id: roomId });

    if (!room) {
      throw new NotFoundException('Room not exist.');
    }

    const roomToUser = await this._roomUserRepository.find({
      userId,
      roomId,
    });

    if (roomToUser) {
      throw new BadRequestException('User already joined the room.');
    }

    await this._roomUserRepository.create({ userId, roomId });

    return room;
  }

  public async getUserRooms({
    userId,
  }: GetUserRoomsDto): Promise<RoomDocument[]> {
    const roomUsers = await this._roomUserRepository.find({ userId });

    const roomIds = roomUsers.map((roomUser) => roomUser.roomId);

    return this._roomsRepository.find({ _id: { $in: roomIds } });
  }
}
