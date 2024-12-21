export class ProjectEntity {
  public readonly id: string
  public readonly name: string
  public readonly description: string
  public readonly status: string
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor({ id, name, description, status, createdAt, updatedAt }: Partial<ProjectEntity>) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}