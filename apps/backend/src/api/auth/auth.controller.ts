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
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { DomainUtil, UserUtil } from '../../shared/utils';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { JwtGuard } from './guards/jwt.gaurd';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
    private readonly _jwtService: JwtService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this._authService.register(createUserDto);

    const domain: string = this._configService.getOrThrow('FRONTEND_URL');
    const domainAttributes = DomainUtil.getAttributes(domain);

    const tokenPayload: AccessTokenPayload = {
      userId: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this._configService.get<number>('JWT_EXPIRATION'),
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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokenPayload: AccessTokenPayload = {
      userId: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this._configService.get<number>('JWT_EXPIRATION'),
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

  @Post('logout')
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

  @Get('me')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUser(@CurrentUser() user: User) {
    return UserUtil.normalizeUser(user);
  }
}
