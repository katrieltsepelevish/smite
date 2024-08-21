import { HttpException, HttpStatus } from '@nestjs/common';

export class WhiteboardAccessDeniedException extends HttpException {
  constructor() {
    super('You do not have access to this whiteboard', HttpStatus.FORBIDDEN);
  }
}
