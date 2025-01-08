import { DeleteApiResponse, UpdateApiOptions, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from "cloudinary";

export abstract class UploadStorageRepository {
  abstract upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
  abstract delete(id: string): Promise<DeleteApiResponse>;
  abstract update(id: string, options: UpdateApiOptions):  Promise<UploadApiResponse | UploadApiErrorResponse>;
}