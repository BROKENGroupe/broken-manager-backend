import { Injectable } from '@nestjs/common';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectCreateHttpDto } from '../../presentation/http-dtos/project-create-http-dto';

@Injectable()
export class UpdateProjectUseCase {
  // constructor(private readonly projectService: ProjectService) {}

  // async execute(projectDto: IProjectDto): Promise<ProjectEntity> {
  //   return this.projectService.updateProject(projectDto);
  // }
}
