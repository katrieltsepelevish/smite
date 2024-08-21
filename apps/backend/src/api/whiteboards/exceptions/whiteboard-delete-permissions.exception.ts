import { HttpException, HttpStatus } from '@nestjs/common';

export class WhiteboardDeletePermissionsException extends HttpException {
  constructor() {
    super(
      'You do not have permission to delete this whiteboard',
      HttpStatus.FORBIDDEN,
    );
  }
}
