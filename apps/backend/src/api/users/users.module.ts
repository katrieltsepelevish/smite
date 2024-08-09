import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../common';
import { UserDocument, UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { UsersRepository } from './users.respository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
