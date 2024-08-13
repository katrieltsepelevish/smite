import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.gaurd';
import { User } from '../auth/decorators/user.decorator';
import { UserDocument } from '../users/user.schema';
import { RoomsService } from './rooms.service';
import { JoinRoomRequestDto } from './dto/join-room-request.dto';

@Controller('/rooms')
export class RoomsController {
  constructor(private readonly _roomsService: RoomsService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createRoom(@User() user: UserDocument) {
    const createdRoom = await this._roomsService.createRoom({
      userId: user._id,
    });

    return createdRoom;
  }

  @Post('/join')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async joinRoom(
    @User() user: UserDocument,
    @Body() joinRoomRequestDto: JoinRoomRequestDto,
  ) {
    const room = await this._roomsService.joinRoom({
      userId: user._id,
      roomId: joinRoomRequestDto.roomId,
    });

    return room;
  }

  @Get('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUserRooms(@User() user: UserDocument) {
    const rooms = await this._roomsService.getUserRooms({
      userId: user._id,
    });

    return rooms;
  }
}
