import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { successResponseDto } from '@common/handler/http';
import { CreateBoardDto, UpdateBoardDto } from '@boards/presentation';
import { UseCaseTaskService } from '@tasks/application';
import { TaskEntity } from '@tasks/domain';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly useCaseService: UseCaseTaskService    
  ) { }

  @Get('all')
  async getBoardAll(): Promise<TaskEntity[]> {
    return await this.useCaseService.findAll();
  }

  @Get(':id')
  async getBoardById(@Param('id') id: string): Promise<TaskEntity | []> {
    return await this.useCaseService.findById(id);
  }

  @Post('create')
  async createBoard(@Body() Board: CreateBoardDto): Promise<TaskEntity> {
    return this.useCaseService.create(Board);
  }

  @Put('update/:id')
  async updateBoard(
    @Param('id') id: string,
    @Body() Board: UpdateBoardDto): Promise<TaskEntity> {
    return this.useCaseService.update(id, Board);
  }

  @Delete('delete/:id')
  async deleteBoard(@Param('id') id: string): Promise<successResponseDto> {
    return this.useCaseService.delete(id);
  }
}