import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Image } from '../../../../common/interfaces/image.interface';

export class CreateProjectDto {
    @IsOptional()
    @IsString()
    readonly id?: string;


    @IsString()
    readonly title: string;


    @IsString()
    readonly subtitle: string;


    @IsString()
    readonly status: string;


    @IsString()
    readonly label: string;


    @IsString()
    readonly priority: string;


    @IsString()
    readonly description: string;


    @IsNumber()
    readonly percentage: number;


    @IsOptional()
    @IsArray()
    assign?: Array<{ username: string; image: Image }>;


    @IsString()
    readonly assignDate: string;


    @IsString()
    readonly dueDate: string;


    @IsString()
    readonly createAt: string;


    @IsString()
    readonly updateAt: string;

    readonly isFavorite: boolean;
}





