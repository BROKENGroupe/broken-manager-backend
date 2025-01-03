import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'
import { UserLogin } from '@auth/domain';
import { UserEntity } from '@users/domain';
import { UsesCaseUserService } from '@users/appplication';

@Injectable()
export class AuthJwtService {

    constructor(
        private readonly usesCaseUserService: UsesCaseUserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<UserLogin | null> {
        const user = await this.usesCaseUserService.findByEmail(email);
        if (user?.email == email) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
                const userLogin: UserLogin = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    access_token: this.generateJWT(user).access_token,
                    image: user.image
                }

                return userLogin;
            } else {
                return null;
            }
        } else {
            return null;
        }

    }

    private generateJWT(user: UserEntity) {
        const payload = { role: user.roles, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
