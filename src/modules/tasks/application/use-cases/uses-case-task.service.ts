import { Injectable } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { TaskEntity, TaskRepository } from '@tasks/domain';
import { CreateTaskDto, UpdateTaskDto } from '@tasks/presentation';

@Injectable()
export class UseCaseTaskService {

  constructor(private readonly taskRepository: TaskRepository) { }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.findAll();
  }

  async findById(id: string): Promise<TaskEntity | []> {
    return this.taskRepository.findById(id);
  }

  async create(taskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.save(taskDto);
  }

  async update(id:string, taskDto: UpdateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.update(id, taskDto);
  }

  async delete(id: string): Promise<successResponseDto> {
    return this.taskRepository.delete(id);
  }
}