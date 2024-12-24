import { CreateProjectDto } from '../../presentation/http-dtos/project-create-http-dto';
import { ProjectEntity } from '../entities/project.entity';

export abstract class ProjectRepository {
  abstract save(project: CreateProjectDto);
  abstract update(project: CreateProjectDto);
  abstract findById(id: string);
  abstract findAll();
}