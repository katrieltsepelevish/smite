import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../../users/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const httpRequest = ctx.switchToHttp().getRequest();
    if (httpRequest.user) {
      return httpRequest.user;
    }

    const wsRequest = ctx.switchToWs().getClient();
    if (wsRequest.user) {
      return wsRequest.user;
    }

    return null;
  },
);
