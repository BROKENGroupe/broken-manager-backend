import { Image } from '../../../../common/interfaces/image.interface'; 

export class ProjectEntity {
  public readonly id?: string;
  public readonly title: string;
  public readonly subtitle: string;
  public readonly status: string;
  public readonly label: string;
  public readonly priority: string;
  public readonly description: string;
  public readonly percentage: number;
  public readonly assign: Array<{ image: Image; username: string }>;
  public readonly assignDate: string;
  public readonly dueDate: string;
  public readonly isFavorite: boolean;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor({
    id,
    title,
    subtitle,
    status = 'in progress',
    label,
    priority = 'low',
    description,
    percentage = 0,
    assign = [],
    assignDate,
    dueDate,
    isFavorite = false,
    createdAt,
    updatedAt,
  }: Partial<ProjectEntity>) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.status = status;
    this.label = label;
    this.priority = priority;
    this.description = description;
    this.percentage = percentage;
    this.assign = assign;
    this.assignDate = assignDate;
    this.dueDate = dueDate;
    this.isFavorite = isFavorite;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }
}