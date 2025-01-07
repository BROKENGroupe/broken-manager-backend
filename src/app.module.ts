import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from '@enviroments/enviroments';
import * as Joi from 'joi';
import config from '@database/config';
import { ProjectModule } from '@projects/project.module';
import { UserModule } from '@users/user.module';
import { AuthModule } from '@auth/auth.module';
import { TaskModule } from '@tasks/task.module';
import { BoardsModule } from '@boards/boards.module';
import { StorageModule } from '@storages/storage.module';

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
    AuthModule,
    BoardsModule,
    TaskModule,
    StorageModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
