import { IsNotEmpty, isNotEmpty, IsOptional, IsString } from "class-validator";
import { StaticImageData } from "../../infrastructure/databases/schemas/projects.schema";

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    readonly title?: string;

    @IsNotEmpty()
    @IsString()
    readonly subtitle?: string;

    @IsNotEmpty()
    @IsString()
    readonly status?: string;

    @IsNotEmpty()
    @IsString()
    readonly label?: string;

    @IsNotEmpty()
    @IsString()
    readonly priority?: string;

    @IsNotEmpty()
    @IsString()
    readonly description?: string;

    @IsNotEmpty()
    readonly percentage?: number;

    @IsNotEmpty()
    readonly assign?: Array<{ image: StaticImageData; label: string; value: string }>;

    @IsNotEmpty()
    @IsString()
    readonly assignDate?: string;

    @IsNotEmpty()
    @IsString()
    readonly dueDate?: string;
    
    @IsNotEmpty()
    readonly isFavorite?: boolean;
}