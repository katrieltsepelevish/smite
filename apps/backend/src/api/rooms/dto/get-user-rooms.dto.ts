import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GetUserRoomsDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
