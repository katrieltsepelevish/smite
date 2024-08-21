import { HttpException, HttpStatus } from '@nestjs/common';

export class WhiteboardUserAlreadyJoinedException extends HttpException {
  constructor() {
    super('User already joined the whiteboard', HttpStatus.CONFLICT);
  }
}
