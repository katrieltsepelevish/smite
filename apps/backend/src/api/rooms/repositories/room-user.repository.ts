import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../../common';
import { RoomUserDocument } from '../schemas/room-user.schema';

@Injectable()
export class RoomUserRepository extends AbstractRepository<RoomUserDocument> {
  protected readonly _logger = new Logger(RoomUserRepository.name);

  constructor(
    @InjectModel(RoomUserDocument.name)
    protected readonly _roomUserModel: Model<RoomUserDocument>
  ) {
    super(_roomUserModel);
  }
}
