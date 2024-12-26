import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserEntity } from '../domain/entities/user.entity';

@Injectable()
export class UsesCaseUserService {

    constructor(private readonly userRepository: UserRepository){}

    async findByEmail(id: string): Promise<UserEntity> {
        return this.userRepository.findByEmail(id);
      }

}
