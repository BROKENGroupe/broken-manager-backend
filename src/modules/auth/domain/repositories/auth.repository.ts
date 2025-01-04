import { AuthSignInDto, AuthSignUpDto } from "@auth/presentation";
import { AuthEntity, UserLogin } from "@auth/domain";

export abstract class AuthRepository {
    abstract singIn(authSignInDto: AuthSignInDto): Promise<UserLogin | null>;
    abstract signUp(authSignUpDto: AuthSignUpDto): Promise<AuthEntity>;
    abstract logout(): Promise<any>;
}