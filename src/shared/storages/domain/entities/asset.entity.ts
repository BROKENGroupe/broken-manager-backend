import { IAsset } from "@common/interfaces";

export class AssetEntity {
    public readonly id?: string;
    public readonly assetId:string;
    public readonly refId?: string
    public readonly ext: string;
    public readonly name: string;
    public readonly size: number;
    public readonly asset: IAsset
    public readonly createdAt: string;
    public readonly updatedAt: string;
  
    constructor({
      id,
      assetId,
      name,
      ext,
      asset,
      size,
      createdAt,
      updatedAt,
    }: Partial<AssetEntity>) {
      this.id = id;
      this.assetId = assetId,
      this.name = name;
      this.ext = ext;
      this.asset = asset,
      this.size= size,
      this.createdAt = createdAt || new Date().toISOString();
      this.updatedAt = updatedAt || new Date().toISOString();
    }
  }