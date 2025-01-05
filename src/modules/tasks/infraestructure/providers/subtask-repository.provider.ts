import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { TypeDatabase } from "@database/models";
import { getModelToken } from "@nestjs/mongoose";
import { SubTask } from "@tasks/infraestructure";
import { SubTaskRepository } from "@tasks/domain";
import { MongoDBSubTaskRespositoryImpl } from "@tasks/infraestructure";

export const SubTaskRepositoryProvider = {
    provide: SubTaskRepository,
    useFactory : (configService: ConfigService, subTaskModel: Model<SubTask>) => {
        const databaseType = configService.get<string>('database.type', TypeDatabase.MONGODB);

        switch (databaseType) {
            case TypeDatabase.MONGODB:
                return new MongoDBSubTaskRespositoryImpl(subTaskModel)                
            default:
                throw new Error('Repositorio no soportado');
        }
    },
    inject: [ConfigService, getModelToken(SubTask.name)]
};