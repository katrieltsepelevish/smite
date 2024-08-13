import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class JoinRoomRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  roomId: Types.ObjectId;
}
