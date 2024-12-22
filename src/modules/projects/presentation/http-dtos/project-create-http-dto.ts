import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateProjectDTO{
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsOptional()
    description?: string;  
    
    @IsNotEmpty()
    status: string;
  
    @IsString()
    @IsNotEmpty()
    createdAt: string;
  
    @IsString()
    @IsNotEmpty()
    updatedAt: string;
}