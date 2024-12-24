import { Global, Module } from '@nestjs/common';
import { ProjectController } from './presentation/project.controller';
import { ProjectRepository } from './domain/repositories/project.repository';
import { MongoDBRespositoryImpl } from './infrastructure/databases/mogodb.repositoryImpl';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './infrastructure/databases/schemas/projects.schema';
import { UseCaseService } from './application/use-cases/uses-case.service';
import { DatabaseModule } from 'src/shared/infrastructure/databases/database/database.module';
import { ValidationDbPipe } from '@/src/common/pipes/validation-db/validation-db.pipe';

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
  ],
  exports: [    
    UseCaseService
  ]
})
export class ProjectModule { }