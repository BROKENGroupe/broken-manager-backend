import { Inject, Injectable } from "@nestjs/common";
import { UploadStorageRepository } from "@storages/domain";
import {
    v2 as cloudinary,
    ConfigOptions,
    DeleteApiResponse,
    UpdateApiOptions,
    UploadApiErrorResponse,
    UploadApiOptions,
    UploadApiResponse
} from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryRepositoryImpl implements UploadStorageRepository {

    constructor(@Inject('CLOUDINARY_CONFIG') cloudinaryConfig?: ConfigOptions) {
        cloudinary.config(cloudinaryConfig);
    }

    async upload(
        file: Express.Multer.File,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
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

    async update(id: string, file: Express.Multer.File): Promise<UpdateApiOptions> {
        try {
            // return new Promise((resolve, reject) => {
            //     cloudinary.uploader.explicit(id, file, (error, result) => {
            //         if (error) {
            //             reject(error);
            //         } else {
            //             resolve(result);
            //         }
            //     });
            // });


            return new Promise((resolve, reject) => {
                const upload = cloudinary.uploader.explicit(id, file, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
                //toStream(file.buffer).pipe(upload);
            });

        } catch (error) {
            console.log(error)
        }
        
    }
}