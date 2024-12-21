import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { ProjectCreateHttpDto } from './http-dtos/project-create-http-dto';
import { ProjectsService } from '../application/use-cases/uses-case.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectsService,
  ) { }

  @Get('all')
  async getProjectAlls() {
    return await this.projectService.findAll();
  }

  @Get('all2')
  async getProjectAlls2() {
    return 'Hello World';
  }
}