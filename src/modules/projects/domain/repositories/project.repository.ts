import { successResponseDto } from '@common/handlers/http';
import { CreateProjectDto, UpdateProjectDto } from '@projects/presentation';
import { ProjectEntity } from '@projects/domain';
import { MemberEntity } from '../entities';

export abstract class ProjectRepository {
  abstract save(project: CreateProjectDto): Promise<ProjectEntity>;
  abstract update(id: string, project: UpdateProjectDto): Promise<ProjectEntity | null>;
  abstract findById(id: string): Promise<ProjectEntity | []>;
  abstract findMembersById(id: string): Promise<MemberEntity[] | []>;
  abstract findAll(): Promise<ProjectEntity[]>;
  abstract delete(id: string): Promise<successResponseDto>;
}