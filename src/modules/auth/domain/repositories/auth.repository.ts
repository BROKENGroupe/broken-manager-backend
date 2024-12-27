import { AuthSignInDto } from "../../presentation/http-dtos/auth-signin-http.dto";
import { AuthSignUpDto } from "../../presentation/http-dtos/auth.singup-http.dto";
import { AuthEntity } from "../entities/auth.entity";
import { UserLogin } from "../entities/user-login.entity";

export abstract class AuthRepository {
    abstract singIn(authSignInDto: AuthSignInDto): Promise<UserLogin | null>;
    abstract signUp(authSignUpDto: AuthSignUpDto): Promise<AuthEntity>;
    abstract logout(): Promise<any>;
}