import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { promises } from 'dns';
import { UserLogin } from '../domain/entities/user-login.entity';
import { AuthUseCaseService } from '../application/use-cases/auth.uses-case.service';
import { AuthSignInDto } from './http-dtos/auth-signin-http.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authUseCaseService: AuthUseCaseService
  ) { }

  @Post('login')
  async login(@Body() userLogin: AuthSignInDto): Promise<UserLogin | null> {
    const user = await this.authUseCaseService.login(userLogin);
    if (!user) {
      // Respuesta personalizada para el 401
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
        error: 'Unauthorized'
      });
    } else {
      return user;
    }



  }
}


