import { UsesCaseUserService } from '@/src/modules/users/appplication/uses-case-user.service';
import { User } from '@/src/modules/users/infrastructure/databases/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AuthEntity } from '../../domain/entities/auth.entity';

@Injectable()
export class AuthJwtService {

    constructor(
        private readonly usesCaseUserService: UsesCaseUserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<AuthEntity | null> {
        const user = await this.usesCaseUserService.findByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return {
                    id: user.id,
                    email: user.email,
                    roles: user.roles,
                    password: user.password,
                    username: user.username,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            }
        }
        return null;
    }

    generateJWT(user: User) {
        const payload = { role: user.roles, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
