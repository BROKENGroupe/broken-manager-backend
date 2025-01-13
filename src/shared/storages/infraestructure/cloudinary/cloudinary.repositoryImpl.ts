import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AssetEntity, UploadStorageRepository } from "@storages/domain";
import {
    v2 as cloudinary,
    ConfigOptions,
    DeleteApiResponse,
    UploadApiErrorResponse,
    UploadApiResponse
} from 'cloudinary';
import toStream = require('buffer-to-stream');
import { IAsset } from "@common/interfaces";
import { getFileExtension } from "@common/utils/files.extension";

@Injectable()
export class CloudinaryRepositoryImpl implements UploadStorageRepository {

    constructor(@Inject('CLOUDINARY_CONFIG') cloudinaryConfig?: ConfigOptions) {
        cloudinary.config(cloudinaryConfig);
    }

    async upload(file: Express.Multer.File): Promise<AssetEntity> {
        try {
              // Espera el resultado de Cloudinary
        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder: 'assets',
                    resource_type: 'auto',
                    use_filename: true,
                    discard_original_filename: false,
                    filename_override: file.originalname
                },
                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                    if (error) return reject(error); // En caso de error
                    resolve(result!); // Devuelve el resultado
                }
            );
            toStream(file.buffer).pipe(upload);
        });

        const asset: IAsset = {
            src: result.secure_url,
            width: result.width ?? 0,
            height: result.height ?? 0
        }   

        return new AssetEntity(
            {
                assetId: result.asset_id,
                name: result.display_name,
                ext: result.format ?? getFileExtension(result.url),
                size: result.bytes,
                asset: asset,
            }
        );
        } catch (error) {
            console.log(error)
        }
      
    }

    async delete(id: string): Promise<DeleteApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(id, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async update(id: string, file: Express.Multer.File): Promise<AssetEntity> {

        if (!id) throw new HttpException('El ID de la imagen es obligatorio.', 401);
        if (!file) throw new HttpException('El archivo es obligatorio.', 401);

        const deleteResult = await cloudinary.uploader.destroy(id);
        if (deleteResult.result !== 'ok') {
            throw new HttpException('No se pudo eliminar la imagen con ID: ${id}', 404)
        }

        const uploadResult: AssetEntity = await this.upload(file);



        return uploadResult;
    }
}