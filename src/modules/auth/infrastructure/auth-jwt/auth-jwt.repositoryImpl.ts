import { HttpException, Injectable } from "@nestjs/common";
import { AuthEntity } from "../../domain/entities/auth.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthSignInDto } from "../../presentation/http-dtos/auth-signin-http.dto";
import { AuthSignUpDto } from "../../presentation/http-dtos/auth.singup-http.dto";
import { AuthJwtService } from "./auth-jwt.service";
import { UserLogin } from "../../domain/entities/user-login.entity";
import { HttpErrors } from "@/src/common/handler/http/http-errors-constants";

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