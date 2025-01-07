import { Image } from "@projects/domain";

export class MemberEntity {
    public readonly username: string;
    public readonly image: Image;

    constructor({
        username,
        image
    }: (Partial<MemberEntity>)) {
        this.username = username;
        this.image = image
    }
}