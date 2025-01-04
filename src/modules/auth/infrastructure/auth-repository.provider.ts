import { ConfigService } from "@nestjs/config";
import { AuthJwtRepositoryImpl, AuthJwtService } from "./auth-jwt";
import { AuthRepository, TypeAuth } from "@auth/domain";

export const AuthRepositoryProvider = {
    provide: AuthRepository,
    useFactory: (configService: ConfigService, authJwtService: AuthJwtService) => {
        const authType = configService.get<string>('auth.type', TypeAuth.JWT);

        switch (authType) {
            case TypeAuth.JWT:
                return new AuthJwtRepositoryImpl(authJwtService)
            default:
                throw new Error('Repositorio no soportado');
        }
    },
    inject: [ConfigService, AuthJwtService]
};