import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../../common';
import { RoomDocument } from '../schemas/room.schema';

@Injectable()
export class RoomsRepository extends AbstractRepository<RoomDocument> {
  protected readonly _logger = new Logger(RoomsRepository.name);

  constructor(
    @InjectModel(RoomDocument.name)
    protected readonly _roomModel: Model<RoomDocument>
  ) {
    super(_roomModel);
  }
}
