import { IsNotEmpty, IsString, IsEmail, IsArray, IsDateString } from "class-validator";

export class AuthSignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;
  
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    readonly password: string;
  
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    readonly roles: string[];
  
    @IsNotEmpty()
    @IsDateString()
    readonly createdAt: string;
  
    @IsNotEmpty()
    @IsDateString()
    readonly updatedAt: string;
  }