import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { UseCaseService } from '@projects/application';
import { ProjectEntity } from '@projects/domain';
import { CreateProjectDto, UpdateProjectDto } from '@projects/presentation';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly useCaseService: UseCaseService    
  ) { }

  @Get('all')
  async getProjectAll(): Promise<ProjectEntity[]> {
    return await this.useCaseService.findAll();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<ProjectEntity | []> {
    return await this.useCaseService.findById(id);
  }

  @Post('create')
  async createProject(@Body() project: CreateProjectDto): Promise<ProjectEntity> {
    return this.useCaseService.create(project);
  }

  @Put('update/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() project: UpdateProjectDto): Promise<ProjectEntity> {
    return this.useCaseService.update(id, project);
  }

  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string): Promise<successResponseDto> {
    return this.useCaseService.delete(id);
  }
}