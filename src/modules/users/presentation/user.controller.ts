import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.http.dto';
import { UsesCaseUserService } from '../appplication/uses-case-user.service';
import { UserEntity } from '../domain/entities/user.entity';

@Controller('users')
export class UserController {

    constructor(private readonly usesCaseUserService: UsesCaseUserService) { }

    @Post('create')
    async createUser(@Body() user: CreateUserDto) : Promise<UserEntity> {
        return this.usesCaseUserService.createUser(user);
    }
}
