import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { TypeDatabase } from "@database/models";
import { getModelToken } from "@nestjs/mongoose";
import { TaskRepository } from "@tasks/domain/repositories";
import { Task, MongoDBRespositoryImpl, TaskOrder } from "@tasks/infraestructure";

export const TaskRepositoryProvider = {
    provide: TaskRepository,
    useFactory : (configService: ConfigService, taskModel: Model<Task>, taskOrderModel: Model<TaskOrder>) => {
        const databaseType = configService.get<string>('database.type', TypeDatabase.MONGODB);

        switch (databaseType) {
            case TypeDatabase.MONGODB:
                return new MongoDBRespositoryImpl(taskModel, taskOrderModel)                
            default:
                throw new Error('Repositorio no soportado');
        }
    },
    inject: [ConfigService, getModelToken(Task.name), getModelToken(TaskOrder.name)]
};