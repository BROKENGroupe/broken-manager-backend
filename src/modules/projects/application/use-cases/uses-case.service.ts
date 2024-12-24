import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../../presentation/http-dtos/project-create-http-dto';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../../domain/repositories/project.repository';

@Injectable()
export class UseCaseService {

  constructor(private readonly projectRepository: ProjectRepository) { }

  async findAll(): Promise<ProjectEntity[]> {
    return this.projectRepository.findAll();
  }

  async create(projectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectRepository.save(projectDto);
  }
}