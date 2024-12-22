import { CreateProjectDTO } from '../../presentation/http-dtos/project-create-http-dto';
import { ProjectEntity } from '../entities/project.entity';

export abstract class ProjectRepository {
  abstract save(project: CreateProjectDTO): ProjectEntity;
  abstract update(project: CreateProjectDTO);
  abstract findById(id: string): ProjectEntity;
  abstract findAll(): Promise<ProjectEntity[]>;
}