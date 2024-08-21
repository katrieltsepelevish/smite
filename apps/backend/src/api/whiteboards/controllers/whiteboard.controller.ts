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

import { WhiteboardService } from '../services/whiteboard.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../users/user.entity';
import { UpdateWhiteboardDto } from '../dto/update-whiteboard.dto';
import { JwtGuard } from '../../auth/guards/jwt.gaurd';

@Controller('/whiteboard')
export class WhiteboardController {
  constructor(private readonly _whiteboardService: WhiteboardService) {}

  @Post('/join/:token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async joinWhiteboard(
    @Param('token') token: string,
    @CurrentUser() user: User,
  ) {
    const joinedWhiteboard = await this._whiteboardService.joinWhiteboard({
      token,
      userId: user.id,
    });

    return joinedWhiteboard;
  }

  @Get('/:token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getWhiteboard(
    @Param('token') token: string,
    @CurrentUser() user: User,
  ) {
    const whiteboard = await this._whiteboardService.getWhiteboardByToken({
      token,
      userId: user.id,
    });

    return whiteboard;
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async deleteWhiteboard(@Param('id') id: string, @CurrentUser() user: User) {
    return this._whiteboardService.removeWhiteboard({
      id,
      userId: user.id,
    });
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async updateWhiteboard(
    @Param('id') id: string,
    @Body() updateWhiteboardDto: UpdateWhiteboardDto,
  ) {
    return this._whiteboardService.updateWhiteboard({
      id,
      updateWhiteboardDto,
    });
  }
}
