import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CreateTaskDto, TaskOrderDto } from '@tasks/presentation';
import { Task, TaskSchema } from '@tasks/infraestructure';
import { IsArray } from 'class-validator';

@Schema()
export class TaskOrder extends Document {

  @Prop()
  id?: string;

  @Prop()
  boardId?: string;

  @Prop()
  projectId?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: Task[]; // Array de ObjectId que hace referencia a Task
}

export const TaskOrderSchema = SchemaFactory.createForClass(TaskOrder);

TaskOrderSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

TaskOrderSchema.set('toObject', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
