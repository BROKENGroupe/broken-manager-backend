import { IsNotEmpty, IsString, IsEmail, IsArray, IsDateString, IsOptional } from "class-validator";

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
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly roles: string[];
  
    @IsOptional()
    @IsDateString()
    readonly createdAt: string;
  
    @IsOptional()
    @IsDateString()
    readonly updatedAt: string;
  }