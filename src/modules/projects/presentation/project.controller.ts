import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { successResponseDto } from '@common/handlers/http';
import { UseCaseService } from '@projects/application';
import { ProjectEntity } from '@projects/domain';
import { CreateProjectDto, UpdateProjectDto } from '@projects/presentation';
import { UserEntity } from '@users/domain';
import { MemberEntity } from '@projects/domain/entities';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly useCaseService: UseCaseService    
  ) { }

  @Get('all')
  async getProjectAll(): Promise<ProjectEntity[]> {
    return await this.useCaseService.findAll();
  }

  @Get('all/:id')
    async getMermbersByid(@Param('id') id: string): Promise<MemberEntity[]> {
      return this.useCaseService.findMembersById(id);
    }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<ProjectEntity | []> {
    return await this.useCaseService.findById(id);
  }

  @Get('members/:id')
  async getMembersById(@Param('id') id: string): Promise<MemberEntity[] | []> {
    return await this.useCaseService.findMembersById(id);
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