import {
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

@Controller('/rooms')
export class RoomsController {
  constructor(private readonly _roomsService: RoomsService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createRoom(@User() user: UserDocument) {
    const createdRoom = await this._roomsService.create({
      userId: user._id,
    });

    return createdRoom;
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
