import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.gaurd';
import { WhiteboardsService } from './whiteboards.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('/whiteboards')
export class WhiteboardsController {
  constructor(private readonly _whiteboardsService: WhiteboardsService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createWhiteboard(@CurrentUser() user: User) {
    const createdWhiteboard = await this._whiteboardsService.createWhiteboard(
      user.id,
    );

    return createdWhiteboard;
  }

  @Post('/join/:id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async joinWhiteboard(
    @Param('id') whiteboardId: string,
    @CurrentUser() user: User,
  ) {
    const joinedWhiteboard = await this._whiteboardsService.joinWhiteboard(
      whiteboardId,
      user.id,
    );

    return joinedWhiteboard;
  }

  @Get('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUserWhiteboards(@CurrentUser() user: User) {
    const whiteboards = await this._whiteboardsService.getWhiteboardsByUserId(
      user.id,
    );

    return whiteboards;
  }
}
