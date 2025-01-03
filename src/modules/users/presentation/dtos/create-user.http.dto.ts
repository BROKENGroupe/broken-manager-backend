import { Image } from "@projects/domain";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    id?: string;

    @IsString()
    username: string;
   
    @IsEmail()
    email: string;
    
    @IsString()
    password: string;    

    @IsArray()
    roles: string[];

    @IsNotEmpty()
    readonly image: Image;
    
    @IsBoolean()
    isActive: boolean;
    
    @IsOptional()
    @IsString()
    createdAt: string;

    @IsOptional()
    @IsString()
    updatedAt: string;
}