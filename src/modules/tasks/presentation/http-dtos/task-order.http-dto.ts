import { Image } from '@projects/domain';
import { IsString, IsOptional, IsArray, IsIn, IsNumber } from 'class-validator';
import { CreateSubTaskDto } from './subtask-create.http-dto';
import { CreateTaskDto } from './task-create.http-dto';

export class TaskOrderDto {
    @IsOptional()
    @IsString()
    id?: string;
    
    @IsString()
    boardId?: string;   

    @IsArray()
    tasks: any[];
}

