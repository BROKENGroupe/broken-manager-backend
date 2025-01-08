import { ConfigService } from '@nestjs/config';
import { ConfigOptions } from 'cloudinary';

export const CloudinaryConfigProvider = {
  provide: 'CLOUDINARY_CONFIG',
  useFactory: (configService: ConfigService): ConfigOptions => {
    return {
      cloud_name: configService.get('CLOUDINARY_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    };
  },
  inject: [ConfigService],
};