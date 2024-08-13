import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../common';
import { UserDocument } from './user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly _logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    protected readonly _userModel: Model<UserDocument>
  ) {
    super(_userModel);
  }
}
