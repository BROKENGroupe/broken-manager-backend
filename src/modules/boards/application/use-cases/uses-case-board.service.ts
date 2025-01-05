import { Injectable } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { BoardEntity } from '@boards/domain';
import { CreateBoardDto, UpdateBoardDto } from '@boards/presentation';
import { BoardRepository } from '@boards/domain/repositories';

@Injectable()
export class UseCaseBoardService {

  constructor(private readonly boardRepository: BoardRepository) { }

  async findAll(): Promise<BoardEntity[]> {
    return this.boardRepository.findAll();
  }

  async findById(id: string): Promise<BoardEntity | []> {
    return this.boardRepository.findById(id);
  }

  async findAllById(id: string): Promise<BoardEntity[] | []> {
    return this.boardRepository.findAllById(id);
  }

  async create(boardDto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardRepository.save(boardDto);
  }

  async update(id:string, boardDto: UpdateBoardDto): Promise<BoardEntity> {
    return this.boardRepository.update(id, boardDto);
  }

  async delete(id: string): Promise<successResponseDto> {
    return this.boardRepository.delete(id);
  }
}