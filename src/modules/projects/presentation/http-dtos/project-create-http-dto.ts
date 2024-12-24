import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Image } from '../../domain/models/image.interface';

export class CreateProjectDto {
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;    
    
    @IsNotEmpty()
    @IsString()
    readonly subtitle: string;
    
    @IsNotEmpty()
    @IsString()
    readonly status: string;
    
    @IsNotEmpty()
    @IsString()
    readonly label: string;
    
    @IsNotEmpty()
    @IsString()
    readonly priority: string;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber() 
    readonly percentage: number;

    @IsNotEmpty()
    readonly assign: Array<{ image: Image; label: string; value: string }>;
    
    @IsNotEmpty()
    @IsString()
    readonly assignDate: string;
    
    @IsNotEmpty()
    @IsString()
    readonly dueDate: string;

    @IsOptional()
    @IsString()
    readonly createAt: string;

    @IsOptional()
    @IsString()
    readonly updateAt: string;

    readonly isFavorite: boolean;
}





