import { Injectable } from '@nestjs/common';
import { UploadStorageRepository } from '@storages/domain';
import { DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UsescaseStorageService {

    constructor(readonly uploadRepository: UploadStorageRepository){}

    upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>{
        return this.uploadRepository.upload(file);
    }

    delete(id: string): Promise<DeleteApiResponse>{
        return this.uploadRepository.delete(id);
    }

}
