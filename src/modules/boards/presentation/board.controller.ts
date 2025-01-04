import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { BoardEntity } from '@boards/domain';
import { CreateBoardDto, UpdateBoardDto } from '@boards/presentation';
import { UseCaseBoardService } from '@boards/application';

@Controller('boards')
export class BoardController {
  constructor(
    private readonly useCaseService: UseCaseBoardService    
  ) { }

  @Get('all')
  async getBoardAll(): Promise<BoardEntity[]> {
    return await this.useCaseService.findAll();
  }

  @Get(':id')
  async getBoardById(@Param('id') id: string): Promise<BoardEntity | []> {
    return await this.useCaseService.findById(id);
  }

  @Post('create')
  async createBoard(@Body() Board: CreateBoardDto): Promise<BoardEntity> {
    return this.useCaseService.create(Board);
  }

  @Put('update/:id')
  async updateBoard(
    @Param('id') id: string,
    @Body() Board: UpdateBoardDto): Promise<BoardEntity> {
    return this.useCaseService.update(id, Board);
  }

  @Delete('delete/:id')
  async deleteBoard(@Param('id') id: string): Promise<successResponseDto> {
    return this.useCaseService.delete(id);
  }
}