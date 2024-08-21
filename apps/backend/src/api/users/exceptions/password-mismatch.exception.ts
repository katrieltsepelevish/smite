import { HttpException, HttpStatus } from '@nestjs/common';

export class PasswordMismatchException extends HttpException {
  constructor() {
    super('Password does not match', HttpStatus.BAD_REQUEST);
  }
}
