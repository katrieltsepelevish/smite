import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccessTokenPayload } from '../interfaces/access-token-payload.interface';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { UserDocument } from '../../users/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
    private readonly _userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (request: any) =>
          request?.cookies?.Authentication || request?.Authentication,
      ]),
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: AccessTokenPayload) {
    try {
      const user: UserDocument = await this._userService.getUser({
        _id: userId,
      });
      return await this._authService.validateUser(user.email, user.password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
