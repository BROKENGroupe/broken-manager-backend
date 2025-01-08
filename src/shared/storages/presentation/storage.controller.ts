import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsescaseStorageService } from '@storages/application/uses-case-storage.service';
import { UploadApiResponse, UploadApiErrorResponse, DeleteApiResponse } from 'cloudinary';

@Controller('storages')
export class StorageController {

  constructor(private readonly uploadFileUseCase: UsescaseStorageService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await this.uploadFileUseCase.upload(file);
  }

  @Delete('delete/:id')
  async deleteFile(@Param('id') publicId: string): Promise<DeleteApiResponse> {
    return await this.uploadFileUseCase.delete(publicId);
  }

}
