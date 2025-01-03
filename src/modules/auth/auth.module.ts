import { Module } from '@nestjs/common';
import { AuthUseCaseService } from '@auth/application';
import { AuthController } from '@auth/presentation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from '@auth/domain';
import { AuthJwtRepositoryImpl } from '@auth/infrastructure';
import { AuthJwtService } from '@auth/infrastructure';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@common/handler/http';
import { UserModule } from '@users/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10000s' }
      })
    }),
    UserModule,    
  ],
  controllers: [AuthController],
  providers: [
    AuthUseCaseService,
    AuthJwtService,
    AuthJwtRepositoryImpl,
    {
      provide: AuthRepository,
      useExisting: AuthJwtRepositoryImpl
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
  exports: [AuthUseCaseService]
})
export class AuthModule { }
