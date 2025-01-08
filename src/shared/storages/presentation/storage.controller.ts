import { Controller, Delete, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsescaseStorageService } from '@storages/application/uses-case-storage.service';
import { UploadApiResponse, UploadApiErrorResponse, DeleteApiResponse, UpdateApiOptions } from 'cloudinary';

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

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<UpdateApiOptions> {
    return await this.uploadFileUseCase.update(id, file);
  }

}
