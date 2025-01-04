import { successResponseDto } from '@common/handlers';
import { Injectable } from '@nestjs/common';
import { UserEntity, UserRepository } from '@users/domain';
import { CreateUserDto, UpdateUserDto } from '@users/presentation';


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
