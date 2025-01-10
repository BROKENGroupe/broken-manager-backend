import { DeleteApiResponse, UpdateApiOptions, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from "cloudinary";
import { AssetEntity } from "../entities";

export abstract class UploadStorageDBRepository {
  abstract save(files: Express.Multer.File[], id: string): Promise<AssetEntity[]>;
  abstract saveTask(files: Express.Multer.File[], id: string, taskId: string): Promise<AssetEntity[]>;
  abstract delete(id: string): Promise<DeleteApiResponse>;
  abstract update(id: string, options: UpdateApiOptions): Promise<AssetEntity>;
  abstract getAssetsAll(): Promise<AssetEntity[] | []>;
  abstract getAssetsById(id: string): Promise<AssetEntity[] | []>;
  abstract getAssetsTasksById(id: string): Promise<AssetEntity[] | []>;
}