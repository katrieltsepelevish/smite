import { Module } from '@nestjs/common';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsRepository } from './repositories/rooms.repository';
import { RoomUserRepository } from './repositories/room-user.repository';
import { RoomDocument, RoomSchema } from './schemas/room.schema';
import { RoomUserDocument, RoomUserSchema } from './schemas/room-user.schema';
import { DatabaseModule } from '../../common';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: RoomDocument.name, schema: RoomSchema },
      { name: RoomUserDocument.name, schema: RoomUserSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository, RoomUserRepository],
  exports: [RoomsService],
})
export class RoomsModule {}
