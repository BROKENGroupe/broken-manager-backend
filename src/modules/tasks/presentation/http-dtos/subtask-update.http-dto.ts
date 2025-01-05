import { IsString, IsOptional, IsBoolean, IsArray, IsIn } from 'class-validator';
import { Image } from '@projects/domain';

export class UpdateSubTaskDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    title: string;

    @IsOptional()
    @IsIn(['todo', 'inprogress', 'done'])
    status?: string;

    @IsOptional()
    @IsIn(['low', 'medium', 'high'])
    priority?: string;

    @IsOptional()
    @IsArray()
    assign?: Array<{ username: string; image: Image }>;

    @IsOptional()
    @IsString()
    assignDate?: string;

    @IsOptional()
    @IsString()
    dueDate?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsString()
    logo?: string | null;

    @IsOptional()
    @IsString()
    taskId?: string;
}
