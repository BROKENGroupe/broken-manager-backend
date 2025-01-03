import { GlobalExceptionFilter } from '@common/handler';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema, MongoDBRespositoryImpl } from '@boards/infraestructure';
import { BoardController } from '@boards/presentation';
import { UseCaseBoardService } from '@boards/application';
import { BoardRepository } from '@boards/domain/repositories';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Board.name, schema: BoardSchema }
        ]),
        DatabaseModule.forRoot()
    ],
    controllers: [
        BoardController
    ],
    providers: [
        UseCaseBoardService,
        MongoDBRespositoryImpl,
        {
            provide: BoardRepository,
            useExisting: MongoDBRespositoryImpl
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter
        }
    ],
    exports: [
        UseCaseBoardService
    ]
})
export class BoardsModule { }
