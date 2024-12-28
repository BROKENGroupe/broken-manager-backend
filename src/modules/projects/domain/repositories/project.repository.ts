import { successResponseDto } from '@/src/common/handler/http/http-response.dto';
import { CreateProjectDto } from '../../presentation/http-dtos/project-create-http-dto';
import { UpdateProjectDto } from '../../presentation/http-dtos/project-update-http-dto';
import { ProjectEntity } from '../entities/project.entity';

export abstract class ProjectRepository {
  abstract save(project: CreateProjectDto): Promise<ProjectEntity>;
  abstract update(id: string, project: UpdateProjectDto): Promise<ProjectEntity | null>;
  abstract findById(id: string): Promise<ProjectEntity | []>;
  abstract findAll(): Promise<ProjectEntity[]>;
  abstract delete(id: string): Promise<successResponseDto>;
}