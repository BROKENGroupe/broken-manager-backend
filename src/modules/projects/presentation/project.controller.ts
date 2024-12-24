import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { CreateProjectDto } from './http-dtos/project-create-http-dto';
import { UseCaseService } from '../application/use-cases/uses-case.service';
import { ProjectEntity } from '../domain/entities/project.entity';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly useCaseService: UseCaseService,
  ) { }

  @Get('all')
  async getProjectAlls(): Promise<ProjectEntity[]> {
    return await this.useCaseService.findAll();
  }

  @Post('create')
  async createProject(@Body() createProject: CreateProjectDto): Promise<ProjectEntity> {
    return this.useCaseService.create(createProject);
  }
}