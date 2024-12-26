export class AuthEntity {
    public readonly id: string;
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public readonly roles: string[];
    public readonly createdAt: string;
    public readonly updatedAt: string;

    constructor(
        id: string,
        username: string,
        email: string,
        password: string,
        roles: string[],
        createdAt: string,
        updatedAt: string,
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.createdAt = createdAt || new Date().toISOString();
        this.updatedAt = updatedAt || new Date().toISOString();
    }
}