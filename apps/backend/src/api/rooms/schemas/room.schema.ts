import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument } from '../../../common';

@Schema({ versionKey: false, timestamps: true })
export class RoomDocument extends AbstractDocument {
  @Prop()
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(RoomDocument);
