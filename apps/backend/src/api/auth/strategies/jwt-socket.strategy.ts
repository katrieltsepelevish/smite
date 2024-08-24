import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Socket } from 'socket.io';

import { AccessTokenPayload } from '../interfaces/access-token-payload.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtSocketStrategy extends PassportStrategy(
  Strategy,
  'jwt-socket',
) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (client: Socket) => {
          const token: string = client.handshake.headers.cookie
            .split('; ')
            .find((cookie: string) => cookie.startsWith('Authentication'))
            .split('=')[1];

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: AccessTokenPayload) {
    return this._usersService.getUser({ id: userId });
  }
}
