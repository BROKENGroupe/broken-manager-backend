import { Module } from '@nestjs/common';
import { AuthUseCaseService } from '@auth/application';
import { AuthController } from '@auth/presentation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtRepositoryImpl, AuthJwtService } from '@auth/infrastructure';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@common/handlers/http';
import { UserModule } from '@users/user.module';
import { UsesCaseUserService } from '@users/appplication';
import { AuthRepositoryProvider } from '@auth/infrastructure';

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
    AuthRepositoryProvider,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
  exports: [AuthUseCaseService]
})
export class AuthModule { }
