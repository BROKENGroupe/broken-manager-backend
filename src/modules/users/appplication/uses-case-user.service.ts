import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserEntity } from '../domain/entities/user.entity';
import { CreateUserDto } from '../presentation/dtos/create-user.http.dto';
import { UpdateUserDto } from '../presentation/dtos/update-user.http.dto';
import { successResponseDto } from '@/src/common/handler/http/http-response.dto';

@Injectable()
export class UsesCaseUserService {

  constructor(private readonly userRepository: UserRepository) { }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findByEmail(id: string): Promise<UserEntity> {
    return this.userRepository.findByEmail(id);
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(user);
  }

  async updateUser(id:string, user: UpdateUserDto): Promise<UserEntity> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id:string): Promise<successResponseDto> {
    return this.userRepository.delete(id);
  }

}
