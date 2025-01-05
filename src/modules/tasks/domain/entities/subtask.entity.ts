import { Image } from '@projects/domain';

export class SubTaskEntity {
  public readonly id?: string;
  public readonly taskId: string;
  public readonly title: string;
  public readonly status: string;
  public readonly priority: string;
  public readonly assign: Array<{ username: string; image: Image }>;
  public readonly assignDate?: string;
  public readonly dueDate?: string;
  public readonly completed?: boolean;
  public readonly logo?: string | null;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor({
    id,
    taskId,
    title,
    status = 'inprogress',
    priority = 'low',
    assign = [],
    assignDate,
    dueDate,
    completed = false,
    logo,
    createdAt,
    updatedAt,
  }: Partial<SubTaskEntity>) {
    this.id = id;
    this.taskId = taskId;
    this.title = title;
    this.status = status;
    this.priority = priority;
    this.assign = assign;
    this.assignDate = assignDate;
    this.dueDate = dueDate;
    this.completed = completed;
    this.logo = logo;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }
}
