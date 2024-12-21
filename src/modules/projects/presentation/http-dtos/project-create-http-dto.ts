import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ProjectCreateHttpDto{
    @IsString()
    @IsNotEmpty()
    id: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    
    @IsNotEmpty()
    status: string;
  
    @IsDate()
    @Type(() => Date)
    createdAt: Date;
  
    @IsDate()
    @Type(() => Date)
    updatedAt: Date;
}