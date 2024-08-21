import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { WhiteboardsService } from '../services/whiteboards.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../users/user.entity';
import { JwtGuard } from '../../auth/guards/jwt.gaurd';

@Controller('/whiteboards')
export class WhiteboardsController {
  constructor(private readonly _whiteboardsService: WhiteboardsService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  async createWhiteboard(@CurrentUser() user: User) {
    const createdWhiteboard = await this._whiteboardsService.createWhiteboard({
      ownerId: user.id,
    });

    return createdWhiteboard;
  }

  @Get('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUserWhiteboards(@CurrentUser() user: User) {
    const whiteboards = await this._whiteboardsService.getWhiteboardsByUserId({
      userId: user.id,
    });

    return whiteboards;
  }
}
