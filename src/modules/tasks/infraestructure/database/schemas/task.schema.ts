import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Image } from '@common/interfaces';
import { Document } from 'mongoose';
import { ImageSchema } from '@common/schemas';

export type TaskDocument = Task & Document;

@Schema()
export class Task {

  @Prop()
  id?: string;

  @Prop({ required: true })
  boardId: string;  

  @Prop({ required: true })
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
      name: { type: String, required: true },
      image: { type: ImageSchema, required: true },
    },
  ])
  assign: Array<{ name: string; image: Image }>;

  @Prop({ type: ImageSchema })
  image: Image;

  @Prop()
  category: string;

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
      id: { type: String, required: true },
      title: { type: String, required: true },
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