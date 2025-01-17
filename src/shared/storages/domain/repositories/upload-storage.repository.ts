import { DeleteApiResponse, UpdateApiOptions, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from "cloudinary";
import { AssetEntity } from "../entities";

export abstract class UploadStorageRepository {
  abstract upload(file: Express.Multer.File): Promise<AssetEntity>;
  abstract delete(id: string): Promise<DeleteApiResponse>;
  abstract update(id: string, options: UpdateApiOptions):  Promise<AssetEntity>;
}