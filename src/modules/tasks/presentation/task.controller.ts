import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { UseCaseTaskService } from '@tasks/application';
import { TaskEntity } from '@tasks/domain';
import { successResponseDto } from '@common/handlers';
import { CreateTaskDto, UpdateTaskDto } from '@tasks/presentation';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly useCaseService: UseCaseTaskService    
  ) { }

  @Get('all')
  async getTaskAll(): Promise<TaskEntity[]> {
    return await this.useCaseService.findAll();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskEntity | []> {
    return await this.useCaseService.findById(id);
  }

  @Post('create')
  async createTask(@Body() task: CreateTaskDto): Promise<TaskEntity> {
    return this.useCaseService.create(task);
  }

  @Put('update/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: UpdateTaskDto): Promise<TaskEntity> {
    return this.useCaseService.update(id, task);
  }

  @Delete('delete/:id')
  async deleteTask(@Param('id') id: string): Promise<successResponseDto> {
    return this.useCaseService.delete(id);
  }
}