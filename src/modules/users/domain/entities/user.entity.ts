import { Image } from "@projects/domain";

export class UserEntity {
    public readonly id?: string;
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public readonly isActive: boolean;
    public readonly roles: string[];
    public readonly image: Image;
    public readonly createdAt: string;
    public readonly updatedAt: string;

    constructor({
        id,
        username,
        email,
        password,
        roles,
        isActive,
        image,
        createdAt,
        updatedAt,
    }: (Partial<UserEntity>)) {
        this.id = id;
        this.username = username;
        this.isActive = isActive;
        this.email = email;
        this.password = password;
        this.image = image,
        this.roles = roles;
        this.createdAt = createdAt || new Date().toISOString();
        this.updatedAt = updatedAt || new Date().toISOString();
    }
}