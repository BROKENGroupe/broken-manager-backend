import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../../presentation/http-dtos/project-create-http-dto';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { UpdateProjectDto } from '../../presentation/http-dtos/project-update-http-dto';
import { successResponseDto } from '@common/handler/http/http-response.dto';

@Injectable()
export class UseCaseService {

  constructor(private readonly projectRepository: ProjectRepository) { }

  async findAll(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll();
  }

  async findById(id: string): Promise<ProjectEntity | []> {
    return this.projectRepository.findById(id);
  }

  async create(projectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectRepository.save(projectDto);
  }

  async update(id:string, projectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.projectRepository.update(id, projectDto);
  }

  async delete(id: string): Promise<successResponseDto> {
    return this.projectRepository.delete(id);
  }
}