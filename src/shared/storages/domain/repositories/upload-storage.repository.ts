import { DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export abstract class UploadStorageRepository {
  abstract upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
  abstract delete(id: string): Promise<DeleteApiResponse>;
}