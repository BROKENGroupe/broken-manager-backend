import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Image } from '@projects/domain';
import { ImageSchema } from '@database/mongodb';

@Schema()
export class SubTask {

  @Prop()
  id?: string;

  @Prop()
  taskId: string;

  @Prop()
  title: string;

  @Prop({ default: 'inprogress' })
  status: string;

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

  @Prop()
  assignDate: string;

  @Prop()
  dueDate: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: String })
  logo: string | null;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;

  @Prop({ default: new Date().toISOString() })
  updatedAt: string;
}

export const SubTaskSchema = SchemaFactory.createForClass(SubTask);

SubTaskSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

SubTaskSchema.set('toObject', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
