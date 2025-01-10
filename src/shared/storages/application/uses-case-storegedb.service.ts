import { Injectable } from '@nestjs/common';
import { AssetEntity, UploadStorageRepository } from '@storages/domain';
import { UploadStorageDBRepository } from '@storages/domain/repositories/upload-storagedb.repository';
import { DeleteApiResponse } from 'cloudinary';

@Injectable()
export class UsescaseStorageDBService {

    constructor(readonly uploadRepository: UploadStorageDBRepository) { }

    async uploadToSave(files: Express.Multer.File[], id: string): Promise<AssetEntity[]> {
        return await this.uploadRepository.save(files, id);
    }

    async uploadToSaveTask(files: Express.Multer.File[], id: string, taskId: string): Promise<AssetEntity[]> {
        return await this.uploadRepository.saveTask(files, id, taskId);
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

    async getAssetsById(id: string): Promise<AssetEntity[] | []> {
        return await this.uploadRepository.getAssetsById(id);
    }

    async getAssetsTasksById(id: string): Promise<AssetEntity[] | []> {
        return await this.uploadRepository.getAssetsTasksById(id);
    }

}
