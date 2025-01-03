export class BoardEntity {
  public readonly id?: string;
  public readonly name: string;
  public readonly status: string;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor({
    id,
    name,
    status = 'in progress',    
    createdAt,
    updatedAt,
  }: Partial<BoardEntity>) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }
}