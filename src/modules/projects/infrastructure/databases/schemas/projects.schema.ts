import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Image } from '@common/interfaces';

const ImageSchema = new mongoose.Schema({
  src: { type: String },
  height: { type: Number },
  width: { type: Number },
  blurDataURL: { type: String },
  blurWidth: { type: Number },
  blurHeight: { type: Number },
});

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
      image: ImageSchema,
      label: { type: String },
      value: { type: String },
    },
  ])
  assign: Array<{ image: Image; label: string; value: string }>;

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
