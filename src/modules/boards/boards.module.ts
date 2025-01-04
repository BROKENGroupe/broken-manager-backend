import { GlobalExceptionFilter } from '@common/handlers';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from '@boards/infraestructure';
import { BoardController } from '@boards/presentation';
import { UseCaseBoardService } from '@boards/application';
import { BoardRepositoryProvider } from '@boards/infraestructure';

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
        BoardRepositoryProvider,        
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
