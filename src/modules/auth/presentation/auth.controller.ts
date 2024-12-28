import { Body, Controller, HttpException, Post, UnauthorizedException } from '@nestjs/common';
import { UserLogin } from '../domain/entities/user-login.entity';
import { AuthUseCaseService } from '../application/use-cases/auth.uses-case.service';
import { AuthSignInDto } from './http-dtos/auth-signin-http.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authUseCaseService: AuthUseCaseService
  ) { }

  @Post('login')
  async login(@Body() userLogin: AuthSignInDto): Promise<UserLogin> {
    return await this.authUseCaseService.login(userLogin);    
  }
}


