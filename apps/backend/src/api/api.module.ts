import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WhiteboardsModule } from './whiteboards/whiteboards.module';

@Module({
  imports: [UsersModule, AuthModule, WhiteboardsModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
