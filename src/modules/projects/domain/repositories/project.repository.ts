import { ProjectCreateHttpDto } from '../../presentation/http-dtos/project-create-http-dto';
import { ProjectEntity } from '../entities/project.entity';

export abstract class ProjectRepository {
  abstract save(project: ProjectCreateHttpDto): ProjectEntity;
  abstract update(project: ProjectCreateHttpDto);
  abstract findById(id: string): ProjectEntity;
}