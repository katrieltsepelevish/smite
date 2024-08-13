import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class JoinRoomDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  roomId: Types.ObjectId;
}
