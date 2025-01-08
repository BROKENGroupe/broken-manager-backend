import { Injectable } from '@nestjs/common';
import { UploadStorageRepository } from '@storages/domain';
import { DeleteApiResponse, UpdateApiOptions, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UsescaseStorageService {

    constructor(readonly uploadRepository: UploadStorageRepository){}

    async upload(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>{
        return await this.uploadRepository.upload(file);
    }

    async delete(id: string): Promise<DeleteApiResponse>{
        return await this.uploadRepository.delete(id);
    }

    async update(id: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>{
        return await this.uploadRepository.update(id, file);
    }

}
