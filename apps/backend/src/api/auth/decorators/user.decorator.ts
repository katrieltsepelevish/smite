import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDocument } from '../../users/users.schema';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDocument => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
