import { Injectable } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { TaskEntity, TaskRepository } from '@tasks/domain';
import { CreateTaskDto, TaskOrderDto, UpdateTaskDto } from '@tasks/presentation';
import { TaskOrderEntity } from '@tasks/domain/entities/task-order.entity';

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

  async taskOrder(taskDto: TaskOrderDto): Promise<TaskOrderEntity | successResponseDto> {
    return this.taskRepository.orderTaskMove(taskDto);
  }

  async taskOrderCreate(taskDto: any): Promise<TaskOrderEntity> {
    return this.taskRepository.saveTasksMove(taskDto);
  }

  async getTaskOrder(id: string): Promise<TaskEntity[] | []> {
    return this.taskRepository.findTaskOrderByBoard(id);
  }

  async update(id:string, taskDto: UpdateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.update(id, taskDto);
  }

  async delete(boardId: string,  taskId: string): Promise<TaskEntity> {
    return this.taskRepository.delete(boardId, taskId);
  }
}