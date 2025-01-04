import { GlobalExceptionFilter } from '@common/handler';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBRespositoryImpl } from '@tasks/infraestructure';
import { TaskController } from '@tasks/presentation';
import { TaskRepository } from '@tasks/domain';
import { Task, TaskSchema } from '@tasks/infraestructure';
import { UseCaseTaskService } from '@tasks/application';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema }
        ]),
        DatabaseModule.forRoot()
    ],
    controllers: [
        TaskController
    ],
    providers: [
        UseCaseTaskService,
        MongoDBRespositoryImpl,
        {
            provide: TaskRepository,
            useExisting: MongoDBRespositoryImpl
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter
        }
    ],
    exports: [
        UseCaseTaskService
    ]
})
export class TaskModule { }
