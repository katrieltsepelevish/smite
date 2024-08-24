import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import morgan from 'morgan';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  });

  app.use(cookieParser());
  app.use(morgan('combined'));
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());

  app.useWebSocketAdapter(new IoAdapter(app));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);

  app.enableShutdownHooks();
}

bootstrap();
