import { successResponseDto } from '@common/handlers/http';
import { CreateProjectDto, UpdateProjectDto } from '@projects/presentation';
import { ProjectEntity } from '@projects/domain';

export abstract class ProjectRepository {
  abstract save(project: CreateProjectDto): Promise<ProjectEntity>;
  abstract update(id: string, project: UpdateProjectDto): Promise<ProjectEntity | null>;
  abstract findById(id: string): Promise<ProjectEntity | []>;
  abstract findAll(): Promise<ProjectEntity[]>;
  abstract delete(id: string): Promise<successResponseDto>;
}