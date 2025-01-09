import { Injectable } from '@nestjs/common';
import { AssetEntity, UploadStorageRepository } from '@storages/domain';
import { UploadStorageDBRepository } from '@storages/domain/repositories/upload-storagedb.repository';
import { DeleteApiResponse } from 'cloudinary';

@Injectable()
export class UsescaseStorageDBService {

    constructor(readonly uploadRepository: UploadStorageDBRepository) { }

    async uploadToSave(file: Express.Multer.File): Promise<AssetEntity> {
        return await this.uploadRepository.save(file);
    }

    async delete(id: string): Promise<DeleteApiResponse> {
        return await this.uploadRepository.delete(id);
    }

    async update(id: string, file: Express.Multer.File): Promise<AssetEntity> {
        return await this.uploadRepository.update(id, file);
    }

    async getAssets(): Promise<AssetEntity[] | []> {
        return await this.uploadRepository.getAssetsAll();
    }

}
