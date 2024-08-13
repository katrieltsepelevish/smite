import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
