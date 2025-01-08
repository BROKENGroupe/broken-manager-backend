import { Module } from '@nestjs/common';
import {
    CloudinaryConfigProvider,
    CloudinaryRepositoryImpl,
    UploadRepositoryProvider
} from '@storages/infraestructure';
import { UsescaseStorageDBService, UsescaseStorageService } from '@storages/application';
import { StorageController } from './presentation/storage.controller';
import { UploadStorageRepository } from '@storages/domain';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { DatabaseModule } from '@database/database.module';
import { Asset, AssetSchema } from './infraestructure/database/schema/asset.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Asset.name, schema: AssetSchema }
        ]),
        DatabaseModule.forRoot()
    ],
    providers: [
        UsescaseStorageService,
        UsescaseStorageDBService,
        CloudinaryConfigProvider,
        UploadRepositoryProvider,
        CloudinaryRepositoryImpl,
        {
            provide: UploadStorageRepository,
            useExisting: CloudinaryRepositoryImpl
        }
    ],
    controllers: [StorageController],
    exports: [UsescaseStorageService]
})
export class StorageModule { }
