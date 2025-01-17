import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Task } from '@tasks/infraestructure'; // Importar el modelo Task

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

