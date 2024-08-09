import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { UserDocument } from '../users/users.schema';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { ConfigService } from '@nestjs/config';
import { DomainUtil } from './utils/domain.util';
import { JwtGuard } from './guards/jwt.gaurd';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';

@Public()
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService
  ) {}

  @Post('/register')
  async register(
    @Body() createUserDto: RegisterRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, expires } = await this._authService.register(createUserDto);

    const domain: string = this._configService.getOrThrow('FRONTEND_URL');
    const domainAttributes = DomainUtil.getAttributes(domain);

    res.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      expires,
      ...domainAttributes,
    });
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @User() user: UserDocument,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, expires } = await this._authService.login(user);

    const domain: string = this._configService.getOrThrow('FRONTEND_URL');
    const domainAttributes = DomainUtil.getAttributes(domain);

    res.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      expires,
      ...domainAttributes,
    });
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async getUser(@User() user: UserDocument) {
    return user;
  }
}
