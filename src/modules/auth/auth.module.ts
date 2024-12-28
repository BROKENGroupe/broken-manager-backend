import { Module } from '@nestjs/common';
import { AuthUseCaseService } from './application/use-cases/auth.uses-case.service';
import { AuthController } from './presentation/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthJwtRepositoryImpl } from './infrastructure/auth-jwt/auth-jwt.repositoryImpl';
import { AuthJwtService } from './infrastructure/auth-jwt/auth-jwt.service';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@/src/common/handler/http/http-response.handler';

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
