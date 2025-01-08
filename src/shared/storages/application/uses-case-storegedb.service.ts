import { Injectable } from '@nestjs/common';
import { AssetEntity, UploadStorageRepository } from '@storages/domain';
import { DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UsescaseStorageDBService {

    constructor(readonly uploadRepository: UploadStorageRepository){}

    async upload(file: Express.Multer.File): Promise<AssetEntity>{
        return await this.uploadRepository.upload(file);
    }

    async delete(id: string): Promise<DeleteApiResponse>{
        return await this.uploadRepository.delete(id);
    }

    async update(id: string, file: Express.Multer.File): Promise<AssetEntity>{
        return await this.uploadRepository.update(id, file);
    }

}
