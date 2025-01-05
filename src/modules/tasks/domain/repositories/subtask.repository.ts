import { successResponseDto } from "@common/handlers";
import { CreateSubTaskDto, UpdateSubTaskDto } from "@tasks/presentation";
import { SubTaskEntity } from "@tasks/domain";

export abstract class SubTaskRepository {
  abstract save(project: CreateSubTaskDto): Promise<SubTaskEntity>;
  abstract update(id: string, project: UpdateSubTaskDto): Promise<SubTaskEntity | null>;
  abstract findById(id: string): Promise<SubTaskEntity | []>;
  abstract findAllById(id: string): Promise<SubTaskEntity[] | []>
  abstract findAll(): Promise<SubTaskEntity[]>;
  abstract delete(id: string): Promise<successResponseDto>;
}