import { GlobalExceptionFilter } from '@common/handlers';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { SubTask, SubTaskRepositoryProvider, SubTaskSchema, TaskRepositoryProvider } from '@tasks/infraestructure';
import { CommentController, TaskController } from '@tasks/presentation';
import { Task, TaskSchema } from '@tasks/infraestructure';
import { UseCaseSubTaskService, UseCaseTaskService } from '@tasks/application';
import { SubTaskController } from './presentation/subtask.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema },
            { name: SubTask.name, schema: SubTaskSchema }
        ]),
        DatabaseModule.forRoot()
    ],
    controllers: [
        TaskController,
        SubTaskController,
        CommentController
    ],
    providers: [
        UseCaseTaskService,
        UseCaseSubTaskService,
        TaskRepositoryProvider,
        SubTaskRepositoryProvider,
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter
        }
    ],
    exports: [
        UseCaseTaskService,
        UseCaseSubTaskService
    ]
})
export class TaskModule { }
