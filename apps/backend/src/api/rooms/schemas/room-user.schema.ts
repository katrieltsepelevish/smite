import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument } from '../../../common';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class RoomUserDocument extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  roomId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const RoomUserSchema = SchemaFactory.createForClass(RoomUserDocument);
