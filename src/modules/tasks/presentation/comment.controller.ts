import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { UseCaseSubTaskService } from '@tasks/application';
import { SubTaskEntity } from '@tasks/domain';
import { successResponseDto } from '@common/handlers';
import { CreateSubTaskDto, UpdateSubTaskDto } from '@tasks/presentation';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly useCaseSubTaskService: UseCaseSubTaskService    
  ) { }

  @Get('all')
  async getSubTaskAll(): Promise<SubTaskEntity[] | []> {
    return [];
  }

  @Get('all/:id')
  async getSubTaskById(@Param('id') id: string): Promise<SubTaskEntity[] | []> {
    return await this.useCaseSubTaskService.findAllById(id);
  }

  @Post('create')
  async createSubTask(@Body() subTask: CreateSubTaskDto): Promise<SubTaskEntity> {
    return this.useCaseSubTaskService.create(subTask);
  }

  @Put('update/:id')
  async updateSubTask(
    @Param('id') id: string,
    @Body() SubTask: UpdateSubTaskDto): Promise<SubTaskEntity> {
    return this.useCaseSubTaskService.update(id, SubTask);
  }

  @Delete('delete/:id')
  async deleteSubTask(@Param('id') id: string): Promise<successResponseDto> {
    return this.useCaseSubTaskService.delete(id);
  }
}