import { successResponseDto } from "@/src/common/handler/http/http-response.dto";
import { CreateUserDto } from "../../presentation/dtos/create-user.http.dto";
import { UpdateUserDto } from "../../presentation/dtos/update-user.http.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<UserEntity>;
    abstract findById(id: string): Promise<UserEntity>;
    abstract findAll(): Promise<UserEntity[]>;
    abstract create(user: CreateUserDto): Promise<UserEntity>;
    abstract update(id: string, user: UpdateUserDto): Promise<UserEntity>;
    abstract delete(id: string): Promise<successResponseDto>;
}