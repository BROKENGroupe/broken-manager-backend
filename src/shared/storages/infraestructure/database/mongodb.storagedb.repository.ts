import { HttpException, Injectable } from "@nestjs/common";
import { UsescaseStorageService } from "@storages/application";
import { AssetEntity } from "@storages/domain";
import { UploadStorageDBRepository } from "@storages/domain/repositories/upload-storagedb.repository";
import { DeleteApiResponse, UpdateApiOptions } from "cloudinary";
import { Asset } from "./schema/asset.schema";
import { isValidObjectId, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class MongoDBUploadRespositoryImpl implements UploadStorageDBRepository {

    constructor(@InjectModel(Asset.name)
    private readonly assetModel: Model<Asset>,
        readonly usescaseStorageService: UsescaseStorageService) { }


    async getAssetsTasksById(id: string): Promise<AssetEntity[] | []> {
        const result = await this.assetModel.find({
            taskId: { $in: [id] }
        }).exec();

        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result
    }

    async saveTask(files: Express.Multer.File[], id: string, taskId: string): Promise<AssetEntity[]> {
        const uploadResults = await Promise.all(
            files.map(async (file) => {
                const fileAsset: AssetEntity = await this.usescaseStorageService.upload(file);

                if (fileAsset) {

                    const addFile: AssetEntity = { ...fileAsset, refId: id, taskId: taskId }

                    const asset = new this.assetModel(addFile);
                    return await asset.save();
                }
            })
        );

        const assets = uploadResults.filter((asset) => asset !== null) as AssetEntity[];
        return assets;
    }

    async getAssetsById(id: string): Promise<AssetEntity[] | []> {
        const result = await this.assetModel.find({
            refId: { $in: [id] }
        }).exec();

        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result
    }

    async save(files: Express.Multer.File[], id: string): Promise<AssetEntity[]> {

        const uploadResults = await Promise.all(
            files.map(async (file) => {
                const fileAsset: AssetEntity = await this.usescaseStorageService.upload(file);

                if (fileAsset) {

                    const addFile: AssetEntity = { ...fileAsset, refId: id }

                    const asset = new this.assetModel(addFile);
                    return await asset.save();
                }
            })
        );

        const assets = uploadResults.filter((asset) => asset !== null) as AssetEntity[];
        return assets;
    }

    delete(id: string): Promise<DeleteApiResponse> {
        throw new Error("Method not implemented.");
    }
    update(id: string, options: UpdateApiOptions): Promise<AssetEntity> {
        throw new Error("Method not implemented.");
    }

    async getAssetsAll(): Promise<AssetEntity[] | []> {
        const result = await this.assetModel.find().sort('createdAt').exec();
        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result
    }

}