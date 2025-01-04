import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTaskDto {
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;    
    
    @IsNotEmpty()
    @IsString()
    readonly status: string; 
}



