import { Module } from '@nestjs/common';
import { ProjectController } from './presentation/project.controller';
import { ProjectRepository } from './domain/repositories/project.repository';
import { MongoDBRespositoryImpl } from './infrastructure/databases/mogodb.repositoryImpl';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './infrastructure/databases/schemas/projects.schema';
import { UseCaseService } from './application/use-cases/uses-case.service';
import { DatabaseModule } from '@/src/database/database.module';
import { ValidationDbPipe } from '@/src/common/pipes/validation-db/validation-db.pipe';
import { GlobalExceptionFilter } from '@/src/common/handler/http/http-response.handler';
import { APP_FILTER } from '@nestjs/core';

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
    MongoDBRespositoryImpl,
    ValidationDbPipe,
    {
      provide: ProjectRepository,
      useExisting: MongoDBRespositoryImpl
    },
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