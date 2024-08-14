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

import { JwtGuard } from '../auth/guards/jwt.gaurd';
import { WhiteboardsService } from './whiteboards.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { UpdateWhiteboardDto } from './dto/update-whiteboard.dto';

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

  @Delete('/:id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async deleteWhiteboard(@Param('id') id: string, @CurrentUser() user: User) {
    return this._whiteboardsService.removeWhiteboard(id, user.id);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async updateWhiteboard(
    @Param('id') id: string,
    @Body() updateWhiteboardDto: UpdateWhiteboardDto,
  ) {
    return this._whiteboardsService.updateWhiteboard(id, updateWhiteboardDto);
  }
}
