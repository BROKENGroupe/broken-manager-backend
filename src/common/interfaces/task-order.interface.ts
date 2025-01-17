import { TaskEntity } from "@tasks/domain"

export interface TaskOrder{
    id?: string
    boardId?: string
    tasks: TaskEntity
}