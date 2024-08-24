import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhiteboardsController } from './whiteboards.controller';
import { WhiteboardsService } from './whiteboards.service';
import { User } from '../users/user.entity';
import { Whiteboard } from './whiteboard.entity';
import { Note } from '../notes/note.entity';
import { WhiteboardsGateway } from './whiteboards.gateway';
import { UsersService } from '../users/users.service';
import { JwtSocketStrategy } from '../auth/strategies/jwt-socket.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Whiteboard, Note])],
  controllers: [WhiteboardsController],
  providers: [
    UsersService,
    WhiteboardsService,
    WhiteboardsGateway,
    JwtSocketStrategy,
  ],
  exports: [WhiteboardsService],
})
export class WhiteboardsModule {}
