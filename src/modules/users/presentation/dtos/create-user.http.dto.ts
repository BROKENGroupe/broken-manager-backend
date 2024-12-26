import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

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
    
    @IsBoolean()
    isActive: boolean;
    
    @IsOptional()
    @IsString()
    createdAt: string;

    @IsOptional()
    @IsString()
    updatedAt: string;
}