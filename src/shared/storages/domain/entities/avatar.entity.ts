export class AvatarEntity {
    public readonly id?: string;
    public readonly name: string;
    public readonly url: string;
    public readonly mimeType: string;
    public readonly createdAt: string;
    public readonly updatedAt: string;
  
    constructor({
      id,
      name,
      url,
      mimeType,
      createdAt,
      updatedAt,
    }: Partial<AvatarEntity>) {
      this.id = id;
      this.name = name;
      this.url = url;
      this.mimeType = mimeType;
      this.createdAt = createdAt || new Date().toISOString();
      this.updatedAt = updatedAt || new Date().toISOString();
    }
  }
  