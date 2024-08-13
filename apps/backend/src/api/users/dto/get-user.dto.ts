import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GetUserDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId;
}
