export class ProjectEntity {  
  public readonly name: string
  public readonly description: string
  public readonly status: string
  public readonly createdAt: string
  public readonly updatedAt: string

  constructor({ name, description, status, createdAt, updatedAt }: Partial<ProjectEntity>) {    
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }
}