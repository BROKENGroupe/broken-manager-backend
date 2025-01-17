import { TaskEntity } from './task.entity';

export class TaskOrderEntity {
    public readonly id?: string;
    public readonly boardId?: string;
    public readonly tasks: TaskEntity[];
    constructor({
        id,
        boardId,
        tasks
    }: Partial<TaskOrderEntity>) {
        this.id = id;
        this.boardId = boardId;
        this.tasks = tasks;
    }
}
