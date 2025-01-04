import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { TypeDatabase } from "@database/models";
import { getModelToken } from "@nestjs/mongoose";
import { BoardRepository } from "@boards/domain/repositories";
import { Board, MongoDBRespositoryImpl } from "@boards/infraestructure";

export const BoardRepositoryProvider = {
    provide: BoardRepository,
    useFactory : (configService: ConfigService, BoardModel: Model<Board>) => {
        const databaseType = configService.get<string>('database.type', TypeDatabase.MONGODB);

        switch (databaseType) {
            case TypeDatabase.MONGODB:
                return new MongoDBRespositoryImpl(BoardModel)                
            default:
                throw new Error('Repositorio no soportado');
        }
    },
    inject: [ConfigService, getModelToken(Board.name)]
};