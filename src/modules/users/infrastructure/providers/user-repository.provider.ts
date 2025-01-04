import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { MongoDBRespositoryImpl, User } from "@users/infrastructure";
import { TypeDatabase } from "@database/models";
import { UserRepository } from "@users/domain";
import { getModelToken } from "@nestjs/mongoose";

export const UserRepositoryProvider = {
    provide: UserRepository,
    useFactory : (configService: ConfigService, UserModel: Model<User>) => {
        const databaseType = configService.get<string>('database.type', TypeDatabase.MONGODB);

        switch (databaseType) {
            case TypeDatabase.MONGODB:
                return new MongoDBRespositoryImpl(UserModel)                
            default:
                throw new Error('Repositorio no soportado');
        }
    },
    inject: [ConfigService, getModelToken(User.name)]
};