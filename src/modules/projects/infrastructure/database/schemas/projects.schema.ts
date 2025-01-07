import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Image } from '@common/interfaces';
import { ImageSchema } from '@database/mongodb';
import { string } from 'joi';

@Schema()
export class Project extends Document{

  @Prop()
  id?: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  subtitle: string;

  @Prop({ default: 'in progress' })
  status: string;

  @Prop()
  label: string;

  @Prop({ default: 'low' })
  priority: string;

  @Prop()
  description: string;

  @Prop({ default: 0 })
  percentage: number;

  @Prop([
    {
      username: { type: String, required: false },
      image: { type: ImageSchema, required: false },
      _id: false
    },
  ])
  assign: Array<{ username: string; image: Image }>;

  @Prop({ default: new Date().toISOString() })
  assignDate: string;

  @Prop({ default: new Date().toISOString() })
  dueDate: string;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;

  @Prop({ default: new Date().toISOString() })
  updatedAt: string;

  @Prop({ default: false })
  isFavorite: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

ProjectSchema.set('toObject', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
