import { HttpException, HttpStatus } from '@nestjs/common';

export class WhiteboardNotFoundException extends HttpException {
  constructor() {
    super('Whiteboard not found', HttpStatus.NOT_FOUND);
  }
}
