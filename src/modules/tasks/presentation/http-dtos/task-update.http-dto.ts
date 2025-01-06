import { Image } from "@projects/domain";
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
        @IsOptional()
        @IsString()
        id?: string;

        @IsOptional()
        @IsString()
        boardId?: string;


        @IsString()
        title: string;

        @IsString()
        desc: string;

        @IsOptional()
        @IsIn(['todo', 'inprogress', 'done'])
        status?: string;

        @IsOptional()
        @IsNumber()
        percentage?: number;

        @IsOptional()
        @IsArray()
        @IsString({ each: true })
        tags?: string[];

        @IsOptional()
        @IsIn(['low', 'medium', 'high'])
        priority?: string;

        @IsOptional()
        @IsArray({ each: true })
        assign?: Array<{ username: string; image: Image }>;

        @IsOptional()
        @IsString()
        image?: Image;

        @IsString()
        category: string;

        @IsOptional()
        @IsString()
        pages?: string;

        @IsOptional()
        @IsString()
        messageCount?: string;

        @IsOptional()
        @IsString()
        link?: string;

        @IsOptional()
        @IsString()
        date?: string;

        @IsOptional()
        @IsString()
        time?: string;

        @IsOptional()
        @IsArray()
        list?: Array<{ id: string; title: string }>;
}