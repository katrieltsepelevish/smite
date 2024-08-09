import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';

import { AccessTokenPayload } from './interfaces/access-token-payload.interface';
import { UserDocument } from '../users/users.schema';
import { UsersService } from '../users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { AccessToken } from './interfaces/access-token.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    try {
      const user: UserDocument = await this._usersService.findOneByEmail(email);

      const isMatch: boolean = Bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Password does not match');
      }

      return user;
    } catch (err) {
      throw new BadRequestException('User not found');
    }
  }

  async login(user: UserDocument): Promise<AccessToken> {
    const tokenPayload: AccessTokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this._configService.get('JWT_EXPIRATION')
    );

    const token = this._jwtService.sign(tokenPayload);
    return { token, expires };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    await this._validateCreateUser(user);

    const hashedPassword = await Bcrypt.hash(user.password, 10);
    const newUser: CreateUserDto = { ...user, password: hashedPassword };
    const createdUser: UserDocument = await this._usersService.create(newUser);

    return this.login(createdUser);
  }

  private async _validateCreateUser(user: RegisterRequestDto) {
    try {
      await this._usersService.findOneByEmail(user.email);
    } catch (err) {
      return;
    }

    throw new UnprocessableEntityException('Email already exists.');
  }
}
