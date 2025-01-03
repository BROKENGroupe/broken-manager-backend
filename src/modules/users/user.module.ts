
import { Module } from '@nestjs/common';
import { UserController } from '@users/presentation';
import { UsesCaseUserService } from '@users/appplication';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from '@users/domain';
import { DatabaseModule } from '@database/database.module';
import { MongoDBRespositoryImpl, User, UserSchema } from '@users/infrastructure';

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
