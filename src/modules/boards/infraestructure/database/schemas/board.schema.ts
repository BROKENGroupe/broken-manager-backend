import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Board extends Document{

  @Prop()
  id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'in progress' })
  status: string;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;

  @Prop({ default: new Date().toISOString() })
  updatedAt: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

BoardSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

BoardSchema.set('toObject', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
