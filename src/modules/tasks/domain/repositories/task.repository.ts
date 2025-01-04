import { successResponseDto } from '@common/handler/http';
import { CreateTaskDto, UpdateTaskDto } from '@tasks/presentation';
import { TaskEntity } from '../entities';

export abstract class TaskRepository {
  abstract save(project: CreateTaskDto): Promise<TaskEntity>;
  abstract update(id: string, project: UpdateTaskDto): Promise<TaskEntity | null>;
  abstract findById(id: string): Promise<TaskEntity | []>;
  abstract findAll(): Promise<TaskEntity[]>;
  abstract delete(id: string): Promise<successResponseDto>;
}