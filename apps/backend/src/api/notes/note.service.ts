import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Note } from './note.entity';
import { Whiteboard } from '../whiteboards/whiteboard.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class WhiteboardsService {
  protected readonly _logger: Logger;

  constructor(
    @InjectRepository(Note)
    private readonly _notesRepository: Repository<Note>,
    @InjectRepository(Whiteboard)
    private readonly _whiteboardsRepository: Repository<Whiteboard>,
  ) {}

  public async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const whiteboard = await this._whiteboardsRepository.findOne({
      where: { id: createNoteDto.whiteboardId },
    });

    if (!whiteboard) {
      throw new NotFoundException('Whiteboard not found.');
    }

    const createdNote = this._notesRepository.create({
      name: '',
      position: { x: 0, y: 0 },
      whiteboard,
    });

    return this._notesRepository.save(createdNote);
  }

  public async getNoteById(id: string): Promise<Note> {
    const note = await this._notesRepository.findOne({
      where: { id },
      relations: ['whiteboard'],
    });

    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }
}
