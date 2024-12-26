import { Controller, Post, Body, Param, Get, Put, Delete, UsePipes } from '@nestjs/common';
import { CreateProjectDto } from './http-dtos/project-create-http-dto';
import { UseCaseService } from '../application/use-cases/uses-case.service';
import { ProjectEntity } from '../domain/entities/project.entity';
import { UpdateProjectDto } from './http-dtos/project-update-http-dto';
import { ValidationDbPipe } from '@/src/common/pipes/validation-db/validation-db.pipe';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly useCaseService: UseCaseService    
  ) { }

  @Get('all')
  async getProjectAlls(): Promise<ProjectEntity[]> {
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
  async deleteProject(@Param('id') id: string): Promise<boolean> {
    return this.useCaseService.delete(id);
  }
}