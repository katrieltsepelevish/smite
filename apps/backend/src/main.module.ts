import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ApiModule } from './api/api.module';
import { DatabaseModule } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required().port().default(3000),
        REDIS_URI: Joi.string().required().default('redis://localhost:6379'),
        MONGODB_URI: Joi.string()
          .required()
          .default('mongodb://localhost:27017/smite'),
        FRONTEND_URL: Joi.string().required().default('http://localhost:4200'),
        JWT_SECRET: Joi.string().required(),
        PASSWORD_ENCRYPTION: Joi.string().required(),
      }),
      envFilePath: './apps/backend/.env',
    }),
    DatabaseModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
