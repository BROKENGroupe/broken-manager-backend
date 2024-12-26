import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findByEmail(email: string);
}