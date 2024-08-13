import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  userId: Types.ObjectId;
}
