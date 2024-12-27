export class UserLogin {
    public readonly username: string;
    public readonly email: string;
    public readonly access_token: string;

    constructor(email: string, username: string, access_token: string) {
        this.email = email;
        this.username = username;
        this.access_token = access_token;
    }
}