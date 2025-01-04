
import { Module } from '@nestjs/common';
import { UserController } from '@users/presentation';
import { UsesCaseUserService } from '@users/appplication';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@database/database.module';
import { User, UserSchema } from '@users/infrastructure';
import { UserRepositoryProvider } from '@users/infrastructure';

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
        UserRepositoryProvider
    ],
    exports: [UsesCaseUserService]
})
export class UserModule { }
