import { Module } from '@nestjs/common';
import { ProjectController } from '@projects/presentation';
import { ProjectRepository } from '@projects/domain';
import { MongoDBRespositoryImpl } from '@projects/infrastructure';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '@projects/infrastructure';
import { UseCaseService } from '@projects/application';
import { DatabaseModule } from '@database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@common/handlers';
import { ProjectRepositoryProvider } from '@projects/infrastructure';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema }
    ]),
    DatabaseModule.forRoot()
  ],
  controllers: [
    ProjectController
  ],
  providers: [
    UseCaseService,
    ProjectRepositoryProvider,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    }
  ],
  exports: [
    UseCaseService
  ]
})
export class ProjectModule { }