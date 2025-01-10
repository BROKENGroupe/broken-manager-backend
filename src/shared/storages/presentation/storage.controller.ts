import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UsescaseStorageDBService } from '@storages/application';
import { AssetEntity } from '@storages/domain';
import { DeleteApiResponse } from 'cloudinary';
import { UploadDto } from '@storages/presentation';

@Controller('storages')
export class StorageController {

  constructor(private readonly uploadFileUseCase: UsescaseStorageDBService) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[], @Body() body: UploadDto): Promise<AssetEntity[]> {
    return await this.uploadFileUseCase.uploadToSave(files, body.id);
  }

  @Post('upload/tasks')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFileTask(@UploadedFiles() files: Express.Multer.File[], @Body() body: UploadDto): Promise<AssetEntity[]> {
    return await this.uploadFileUseCase.uploadToSaveTask(files, body.id, body.taskId);
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

  @Get('all/:id')
  async getAssetsById(@Param('id') id: string): Promise<AssetEntity[] | []> {
    return await this.uploadFileUseCase.getAssetsById(id);
  }

  @Get('tasks/all/:id')
  async getAssetsTasksById(@Param('id') id: string): Promise<AssetEntity[] | []> {
    return await this.uploadFileUseCase.getAssetsTasksById(id);
  }

}
