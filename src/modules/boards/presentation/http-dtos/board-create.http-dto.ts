import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateBoardDto {
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;    
    
    @IsNotEmpty()
    @IsString()
    readonly status: string; 

    @IsNotEmpty()
    @IsString()
    readonly projectId: string; 
}



