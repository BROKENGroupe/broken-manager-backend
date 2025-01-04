import { Injectable } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { BoardEntity } from '@boards/domain';
import { CreateBoardDto, UpdateBoardDto } from '@boards/presentation';
import { BoardRepository } from '@boards/domain/repositories';

@Injectable()
export class UseCaseBoardService {

  constructor(private readonly projectRepository: BoardRepository) { }

  async findAll(): Promise<BoardEntity[]> {
    return this.projectRepository.findAll();
  }

  async findById(id: string): Promise<BoardEntity | []> {
    return this.projectRepository.findById(id);
  }

  async create(projectDto: CreateBoardDto): Promise<BoardEntity> {
    return this.projectRepository.save(projectDto);
  }

  async update(id:string, projectDto: UpdateBoardDto): Promise<BoardEntity> {
    return this.projectRepository.update(id, projectDto);
  }

  async delete(id: string): Promise<successResponseDto> {
    return this.projectRepository.delete(id);
  }
}