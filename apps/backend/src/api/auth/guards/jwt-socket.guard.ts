import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class JwtSocketGuard extends AuthGuard('jwt-socket') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token: string = client.handshake.headers.cookie
      .split('; ')
      .find((cookie: string) => cookie.startsWith('Authentication'))
      .split('=')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    return super.canActivate(context);
  }
}
