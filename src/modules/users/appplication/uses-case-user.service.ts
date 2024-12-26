import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserEntity } from '../domain/entities/user.entity';
import { CreateUserDto } from '../presentation/dtos/create-user.http.dto';

@Injectable()
export class UsesCaseUserService {

    constructor(private readonly userRepository: UserRepository){}

    async findByEmail(id: string): Promise<UserEntity> {
        return this.userRepository.findByEmail(id);
      }

      async createUser(user: CreateUserDto): Promise<UserEntity> {
        return this.userRepository.create(user);
      }

}
