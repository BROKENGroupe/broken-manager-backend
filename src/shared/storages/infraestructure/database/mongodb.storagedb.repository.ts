import { Injectable } from "@nestjs/common";
import { UsescaseStorageService } from "@storages/application";
import { AssetEntity } from "@storages/domain";
import { UploadStorageDBRepository } from "@storages/domain/repositories/upload-storagedb.repository";
import { DeleteApiResponse, UpdateApiOptions } from "cloudinary";
import { Asset } from "./schema/asset.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MongoDBRespositoryImpl implements UploadStorageDBRepository {

    constructor(@InjectModel(Asset.name)
    private readonly assetModel: Model<Asset>,
        readonly usescaseStorageService: UsescaseStorageService) { }

    async save(file: Express.Multer.File): Promise<AssetEntity> {
        const fileAsset: AssetEntity = await this.usescaseStorageService.upload(file)

        if (fileAsset) {
            const asset = new this.assetModel(fileAsset)
            return await asset.save()
        }
    }

    delete(id: string): Promise<DeleteApiResponse> {
        throw new Error("Method not implemented.");
    }
    update(id: string, options: UpdateApiOptions): Promise<AssetEntity> {
        throw new Error("Method not implemented.");
    }

}