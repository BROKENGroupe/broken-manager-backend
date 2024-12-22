import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { CreateProjectDTO } from './http-dtos/project-create-http-dto';
import { ProjectsService } from '../application/use-cases/uses-case.service';
import { ProjectEntity } from '../domain/entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectsService,
  ) { }

  @Get('all')
  async getProjectAlls(): Promise<ProjectEntity[]> {
    return await this.projectService.findAll();
  }

  @Post('create')
  async createProject(@Body() createProject: CreateProjectDTO): Promise<ProjectEntity> {
    return this.projectService.create(createProject);
  }
}