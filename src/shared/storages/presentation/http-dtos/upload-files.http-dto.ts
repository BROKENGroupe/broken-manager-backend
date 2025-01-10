import { IsOptional, IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  id: string;
  
  @IsOptional()
  @IsString()
  taskId?: string;
}