import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { UserDocument } from '../users/user.schema';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { ConfigService } from '@nestjs/config';
import { DomainUtil } from './utils/domain.util';
import { JwtGuard } from './guards/jwt.gaurd';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import { UserUtil } from './utils/user.util';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
    private readonly _jwtService: JwtService,
  ) {}

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this._authService.register(registerRequestDto);

    const domain: string = this._configService.getOrThrow('FRONTEND_URL');
    const domainAttributes = DomainUtil.getAttributes(domain);

    const tokenPayload: AccessTokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this._configService.get('JWT_EXPIRATION'),
    );

    const token = this._jwtService.sign(tokenPayload);

    res.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      expires,
      ...domainAttributes,
    });

    return UserUtil.normalizeUser(user);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @User() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokenPayload: AccessTokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this._configService.get('JWT_EXPIRATION'),
    );

    const token = this._jwtService.sign(tokenPayload);

    const domain: string = this._configService.getOrThrow('FRONTEND_URL');
    const domainAttributes = DomainUtil.getAttributes(domain);

    res.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      expires,
      ...domainAttributes,
    });

    return UserUtil.normalizeUser(user);
  }

  @Post('/logout')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    const domain: string = this._configService.getOrThrow('FRONTEND_URL');
    const domainAttributes = DomainUtil.getAttributes(domain);

    res.cookie('Authentication', '', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
      ...domainAttributes,
    });
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUser(@User() user: UserDocument) {
    return UserUtil.normalizeUser(user);
  }
}
