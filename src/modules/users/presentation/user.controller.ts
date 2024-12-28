import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.http.dto';
import { UsesCaseUserService } from '../appplication/uses-case-user.service';
import { UserEntity } from '../domain/entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.http.dto';
import { ProjectEntity } from '../../projects/domain/entities/project.entity';
import { successResponseDto } from '@/src/common/handler/http/http-response.dto';

@Controller('users')
export class UserController {

  constructor(private readonly usesCaseUserService: UsesCaseUserService) { }

  @Get('all')
  async getUusersAll(): Promise<UserEntity[]> {
    return this.usesCaseUserService.findAll();
  }

  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usesCaseUserService.createUser(user);
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto): Promise<UserEntity> {
    return this.usesCaseUserService.updateUser(id, user);
  }

  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string): Promise<successResponseDto> {
    return this.usesCaseUserService.deleteUser(id);
  }
}
