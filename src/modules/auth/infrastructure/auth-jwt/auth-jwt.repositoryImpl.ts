import { HttpException, Injectable } from "@nestjs/common";
import { HttpErrors } from "@common/handlers/http";
import { AuthSignInDto, AuthSignUpDto } from "@auth/presentation";
import { AuthEntity, AuthRepository, UserLogin } from "@auth/domain";
import { AuthJwtService } from "@auth/infrastructure";

@Injectable()
export class AuthJwtRepositoryImpl extends AuthRepository {

    constructor(private authJwtService: AuthJwtService) { super() }

    async singIn(authSignInDto: AuthSignInDto): Promise<UserLogin | null> {
        const user = await this.authJwtService
            .validateUser(authSignInDto.email, authSignInDto.password);

        if (!user) {
            throw new HttpException(HttpErrors.UNAUTHORIZED, 401);
        } else {
            return user;
        }
    }
    signUp(authSignUpDto: AuthSignUpDto): Promise<AuthEntity> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}