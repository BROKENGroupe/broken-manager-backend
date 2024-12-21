import { Injectable } from '@nestjs/common';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectCreateHttpDto } from '../../presentation/http-dtos/project-create-http-dto';
import { ProjectRepository } from '../../domain/repositories/project.repository';

@Injectable()
export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(projectDto: ProjectCreateHttpDto): Promise<ProjectEntity> {
    return this.projectRepository.save(projectDto);
  }
}
