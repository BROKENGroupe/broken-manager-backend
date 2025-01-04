import { CreateUserDto, UpdateUserDto } from "@users/presentation";
import { UserEntity } from "@users/domain";
import { successResponseDto } from "@common/handlers";


export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<UserEntity>;
    abstract findById(id: string): Promise<UserEntity>;
    abstract findAll(): Promise<UserEntity[]>;
    abstract create(user: CreateUserDto): Promise<UserEntity>;
    abstract update(id: string, user: UpdateUserDto): Promise<UserEntity>;
    abstract delete(id: string): Promise<successResponseDto>;
}