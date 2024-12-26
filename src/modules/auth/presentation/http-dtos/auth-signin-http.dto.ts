import { IsNotEmpty, IsString } from "class-validator";

export class AuthSignInDto {
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}