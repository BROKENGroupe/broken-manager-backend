import { ConfigService } from "@nestjs/config";
import { UploadStorageRepository } from "@storages/domain";
import { UploadType } from "@storages/domain";
import { CloudinaryRepositoryImpl } from "@storages/infraestructure";

export const UploadRepositoryProvider = {
  provide: UploadStorageRepository,
  useFactory: (
    configService: ConfigService
  ) => {
    const uploadType = configService.get<string>('upload.type', UploadType.cloudinary);

    switch (uploadType) {
      case UploadType.cloudinary:        
        return new CloudinaryRepositoryImpl();
      default:
        throw new Error('Repositorio no soportado');
    }
  },
  inject: [ConfigService, 'CLOUDINARY_CONFIG'], 
};