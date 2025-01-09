import { Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsescaseStorageDBService } from '@storages/application';
import { UsescaseStorageService } from '@storages/application/uses-case-storage.service';
import { AssetEntity } from '@storages/domain';
import { UploadApiResponse, UploadApiErrorResponse, DeleteApiResponse, UpdateApiOptions } from 'cloudinary';

@Controller('storages')
export class StorageController {

  constructor(private readonly uploadFileUseCase: UsescaseStorageDBService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<AssetEntity> {
    return await this.uploadFileUseCase.uploadToSave(file);
  }

  @Delete('delete/:id')
  async deleteFile(@Param('id') publicId: string): Promise<DeleteApiResponse> {
    return await this.uploadFileUseCase.delete(publicId);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<AssetEntity> {
    return await this.uploadFileUseCase.update(id, file);
  }

  @Get('all')
  async getAssets(): Promise<AssetEntity[] | []> {
    return await this.uploadFileUseCase.getAssets();
  }

}
