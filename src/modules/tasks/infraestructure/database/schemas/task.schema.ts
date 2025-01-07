import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Image } from '@common/interfaces';
import { Document } from 'mongoose';
import { ImageSchema } from '@database/mongodb';

export type TaskDocument = Task & Document;

@Schema()
export class Task {

  @Prop()
  id?: string;

  @Prop()
  boardId: string;

  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop({ default: 'inprogress' })
  status: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: 'low' })
  priority: string;

  @Prop([
    {
      username: { type: String, required: false },
      image: { type: ImageSchema, required: false },
      _id: false
    },
  ])
  assign: Array<{ username: string; image: Image }>;

  @Prop({ type: ImageSchema })
  image: Image;

  @Prop()
  category: string;

  @Prop()
  percentage: number;

  @Prop()
  pages: string;

  @Prop()
  messageCount: string;

  @Prop()
  link: string;

  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop([
    {
      id: { type: String, required: false },
      title: { type: String, required: false },
    },
  ])
  list: Array<{ id: string; title: string }>;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;

  @Prop({ default: new Date().toISOString() })
  updatedAt: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

TaskSchema.set('toObject', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});