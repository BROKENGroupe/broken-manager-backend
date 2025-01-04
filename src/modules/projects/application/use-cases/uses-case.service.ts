import { successResponseDto } from '@common/handlers';
import { Injectable } from '@nestjs/common';
import { ProjectRepository, ProjectEntity } from '@projects/domain';
import { CreateProjectDto, UpdateProjectDto } from '@projects/presentation';


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