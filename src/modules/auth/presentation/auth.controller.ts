import { AuthUseCaseService } from '@auth/application';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInDto } from '@auth/presentation';
import { UserLogin } from '@auth/domain';

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


