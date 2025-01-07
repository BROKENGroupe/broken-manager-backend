import { IsArray, IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator";
import { Image } from "../../../../common/interfaces/image.interface";

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    readonly id?: string;


    @IsString()
    readonly title?: string;


    @IsString()
    readonly subtitle?: string;


    @IsString()
    readonly status?: string;


    @IsString()
    readonly label?: string;


    @IsString()
    readonly priority?: string;


    @IsString()
    readonly description?: string;


    readonly percentage?: number;


    @IsOptional()
    @IsArray()
    assign?: Array<{ username: string; image: Image }>;


    @IsString()
    readonly assignDate?: string;

    @IsString()
    readonly dueDate?: string;

    @IsNotEmpty()
    readonly isFavorite?: boolean;
}