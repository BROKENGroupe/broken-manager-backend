import { Injectable } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { SubTaskEntity, TaskEntity, TaskRepository } from '@tasks/domain';
import { CreateSubTaskDto, CreateTaskDto, UpdateSubTaskDto, UpdateTaskDto } from '@tasks/presentation';
import { SubTaskRepository } from '@tasks/domain/repositories/subtask.repository';

@Injectable()
export class UseCaseSubTaskService {

  constructor(private readonly subTaskRepository: SubTaskRepository) { }

  async findAll(): Promise<SubTaskEntity[]> {
    return this.subTaskRepository.findAll();
  }

  async findById(id: string): Promise<SubTaskEntity | []> {
    return this.subTaskRepository.findById(id);
  }

  async findAllById(id: string): Promise<SubTaskEntity[] | []> {
    return this.subTaskRepository.findAllById(id);
  }

  async create(taskDto: CreateSubTaskDto): Promise<SubTaskEntity> {
    return this.subTaskRepository.save(taskDto);
  }

  async update(id:string, taskDto: UpdateSubTaskDto): Promise<SubTaskEntity> {
    return this.subTaskRepository.update(id, taskDto);
  }

  async delete(id: string): Promise<successResponseDto> {
    return this.subTaskRepository.delete(id);
  }
}