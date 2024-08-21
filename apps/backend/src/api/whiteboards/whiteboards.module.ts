import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhiteboardsController } from './controllers/whiteboards.controller';
import { WhiteboardsService } from './services/whiteboards.service';
import { User } from '../users/user.entity';
import { Whiteboard } from './whiteboard.entity';
import { Note } from '../notes/note.entity';
import { WhiteboardService } from './services/whiteboard.service';
import { WhiteboardController } from './controllers/whiteboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Whiteboard, Note])],
  controllers: [WhiteboardsController, WhiteboardController],
  providers: [WhiteboardsService, WhiteboardService],
  exports: [WhiteboardsService, WhiteboardService],
})
export class WhiteboardsModule {}
