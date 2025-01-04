import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { TypeDatabase } from "@database/models";
import { getModelToken } from "@nestjs/mongoose";
import { TaskRepository } from "@tasks/domain/repositories";
import { Task, MongoDBRespositoryImpl } from "@tasks/infraestructure";

export const TaskRepositoryProvider = {
    provide: TaskRepository,
    useFactory : (configService: ConfigService, TaskModel: Model<Task>) => {
        const databaseType = configService.get<string>('database.type', TypeDatabase.MONGODB);

        switch (databaseType) {
            case TypeDatabase.MONGODB:
                return new MongoDBRespositoryImpl(TaskModel)                
            default:
                throw new Error('Repositorio no soportado');
        }
    },
    inject: [ConfigService, getModelToken(Task.name)]
};