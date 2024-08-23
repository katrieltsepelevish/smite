import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhiteboardsController } from './whiteboards.controller';
import { WhiteboardsService } from './whiteboards.service';
import { User } from '../users/user.entity';
import { Whiteboard } from './whiteboard.entity';
import { Note } from '../notes/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Whiteboard, Note])],
  controllers: [WhiteboardsController],
  providers: [WhiteboardsService],
  exports: [WhiteboardsService],
})
export class WhiteboardsModule {}
