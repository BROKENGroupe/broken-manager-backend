import { DynamicModule, Module } from '@nestjs/common';
import { ProjectModule } from './modules/projects/project.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
import config from './database/config';
import { enviroments } from './enviroments';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/presentation/auth.controller';
import { UserModule } from './modules/users/user.module';

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
  controllers: [AuthController],
  providers: [],
})
export class AppModule {
  // static async forRoot(): Promise<DynamicModule> {
  //   return {
  //     module: AppModule,
  //     imports: [
  //       ConfigModule.forRoot({
  //         isGlobal: true, // Configuración global
  //         load: [config]
  //       }),
  //       DatabaseModule.forRoot(), // Llamada asincrónica
  //     ],
  //   };
  // }
}
