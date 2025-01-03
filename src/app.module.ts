import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from '@enviroments/enviroments';
import config from '@database/config';
import { ProjectModule } from '@projects/project.module';
import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string()
          .valid('postgresql', 'mysql', 'mongodb')
          .required()
          .error(() => new Error('DATABASE_TYPE es requerido y debe ser válido (postgresql, mysql, mongodb)')),
      }),
    }),
    ProjectModule,
    UserModule,
    AuthModule    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
