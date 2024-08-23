import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { WhiteboardsService } from './whiteboards.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { JwtGuard } from '../auth/guards/jwt.gaurd';
import { UpdateWhiteboardDto } from './dto/update-whiteboard.dto';

@Controller('whiteboards')
export class WhiteboardsController {
  constructor(private readonly _whiteboardsService: WhiteboardsService) {}

  @Get()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUserWhiteboards(@CurrentUser() user: User) {
    const whiteboards = await this._whiteboardsService.getWhiteboardsByUserId({
      userId: user.id,
    });

    return whiteboards;
  }

  @Post()
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createWhiteboard(@CurrentUser() user: User) {
    const createdWhiteboard = await this._whiteboardsService.createWhiteboard({
      ownerId: user.id,
    });

    return createdWhiteboard;
  }

  @Post('join/:token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async joinWhiteboard(
    @Param('token') token: string,
    @CurrentUser() user: User,
  ) {
    const joinedWhiteboard = await this._whiteboardsService.joinWhiteboard({
      token,
      userId: user.id,
    });

    return joinedWhiteboard;
  }

  @Get(':token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getWhiteboard(
    @Param('token') token: string,
    @CurrentUser() user: User,
  ) {
    const whiteboard = await this._whiteboardsService.getWhiteboardByToken({
      token,
      userId: user.id,
    });

    return whiteboard;
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async deleteWhiteboard(@Param('id') id: string, @CurrentUser() user: User) {
    return this._whiteboardsService.removeWhiteboard({
      id,
      userId: user.id,
    });
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async updateWhiteboard(
    @Param('id') id: string,
    @Body() updateWhiteboardDto: UpdateWhiteboardDto,
  ) {
    return this._whiteboardsService.updateWhiteboard({
      id,
      updateWhiteboardDto,
    });
  }
}
