import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateBoardDto {
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsNotEmpty()
    @IsString()
    readonly name?: string;

    @IsNotEmpty()
    @IsString()
    readonly status?: string;

    
}