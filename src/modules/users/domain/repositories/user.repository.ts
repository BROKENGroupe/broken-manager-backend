import { CreateUserDto } from "../../presentation/dtos/create-user.http.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<UserEntity>;
    abstract findById(id: string): Promise<UserEntity>;
    abstract findAll(): Promise<UserEntity[]>;
    abstract create(user: CreateUserDto): Promise<UserEntity>;
}