import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { MongoDBRespositoryImpl, Project } from "@projects/infrastructure";
import { TypeDatabase } from "@database/models";
import { ProjectRepository } from "@projects/domain";
import { getModelToken } from "@nestjs/mongoose";

export const ProjectRepositoryProvider = {
    provide: ProjectRepository,
    useFactory : (configService: ConfigService, projectModel: Model<Project>) => {
        const databaseType = configService.get<string>('database.type', TypeDatabase.MONGODB);

        switch (databaseType) {
            case TypeDatabase.MONGODB:
                return new MongoDBRespositoryImpl(projectModel)                
            default:
                throw new Error('Repositorio no soportado');
        }
    },
    inject: [ConfigService, getModelToken(Project.name)]
};