import { HttpException, HttpStatus } from '@nestjs/common';

export class NoteNotFoundException extends HttpException {
  constructor() {
    super('Note not found', HttpStatus.NOT_FOUND);
  }
}
