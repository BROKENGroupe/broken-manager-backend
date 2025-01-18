import { successResponseDto } from "@common/handlers";
import { CreateTaskDto, TaskOrderDto, UpdateTaskDto } from "@tasks/presentation";
import { TaskEntity } from "@tasks/domain";
import { TaskOrderEntity } from "../entities/task-order.entity";


export abstract class TaskRepository {
  abstract save(project: CreateTaskDto): Promise<TaskEntity>;
  abstract update(id: string, project: UpdateTaskDto): Promise<TaskEntity | null>;
  abstract findById(id: string): Promise<TaskEntity | []>;
  abstract findAll(): Promise<TaskEntity[]>;
  abstract delete(boardId: string, taskId: string): Promise<successResponseDto>;
  abstract orderTaskMove(tasks: TaskOrderDto): Promise<TaskOrderEntity | successResponseDto>;
  abstract saveTasksMove(tasks: any): Promise<any>;
  abstract findTaskOrderByBoard(id: string): Promise<TaskEntity[] | []>;
}