import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class GetUserRoomsDto {
  @IsString()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
