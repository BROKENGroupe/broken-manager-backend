import { DatabaseModule } from '@/src/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UsesCaseUserService } from './appplication/uses-case-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/databases/schemas/user.schema';
import { UserRepository } from './domain/repositories/user.repository';
import { MongoDBRespositoryImpl } from './infrastructure/mongodb.repositoryImpl';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        DatabaseModule.forRoot()
    ],
    controllers: [UserController],
    providers: [
        UsesCaseUserService,
        MongoDBRespositoryImpl,
        {
            provide: UserRepository,
            useExisting: MongoDBRespositoryImpl
        }
    ],
    exports: [UsesCaseUserService]
})
export class UserModule { }
