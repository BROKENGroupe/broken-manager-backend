import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { AuthSignInDto } from '../../presentation/http-dtos/auth-signin-http.dto';
import { UserLogin } from '../../domain/entities/user-login.entity';

@Injectable()
export class AuthUseCaseService {

    constructor(private readonly authRepository: AuthRepository) { }

    async login(userLogin: AuthSignInDto): Promise<UserLogin | null> {
        return this.authRepository.singIn(userLogin);
    }

}
