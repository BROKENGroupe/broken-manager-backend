import { Module } from '@nestjs/common';
import {
    CloudinaryConfigProvider,
    CloudinaryRepositoryImpl,
    UploadRepositoryProvider
} from '@storages/infraestructure';
import { UsescaseStorageService } from '@storages/application';
import { StorageController } from './presentation/storage.controller';
import { UploadStorageRepository } from '@storages/domain';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        UsescaseStorageService,
        CloudinaryConfigProvider, 
        UploadRepositoryProvider,
        CloudinaryRepositoryImpl,
        {
            provide: UploadStorageRepository,
            useExisting: CloudinaryRepositoryImpl
        }
    ],
    controllers: [StorageController],
    exports:[UsescaseStorageService]
})
export class StorageModule { }
