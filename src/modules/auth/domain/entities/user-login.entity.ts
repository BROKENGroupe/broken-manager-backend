import { Image } from "@projects/domain";

export class UserLogin {
    public readonly id: string;
    public readonly username: string;
    public readonly email: string;
    public readonly access_token: string;
    public readonly image: Image;

    constructor(id: string, email: string, image: Image, username: string, access_token: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.access_token = access_token;
        this.image = image;
    }
}