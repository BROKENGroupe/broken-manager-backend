import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UploadStorageRepository } from "@storages/domain";
import {
    v2 as cloudinary,
    ConfigOptions,
    DeleteApiResponse,
    UploadApiErrorResponse,
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

    async update(id: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
       
            // Validar parámetros de entrada
            if (!id) throw new HttpException('El ID de la imagen es obligatorio.', 401);
            if (!file) throw new HttpException('El archivo es obligatorio.', 401);

            // Eliminar la imagen existente
            const deleteResult = await cloudinary.uploader.destroy(id);
            if (deleteResult.result !== 'ok') {
                throw new HttpException('No se pudo eliminar la imagen con ID: ${id}', 404)
            }

            // Subir la nueva imagen
            const uploadResult: UploadApiResponse | UploadApiErrorResponse = await this.upload(file);

            // Validar la respuesta de la subida
            if ('error' in uploadResult) {
                throw new HttpException(
                    `Error al subir la imagen: ${uploadResult.error.message}`
                    , 500);
            }

            // Retornar la respuesta exitosa
            return uploadResult;
    }
}