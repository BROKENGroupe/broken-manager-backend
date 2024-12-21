import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../../infrastructure/databases/schemas/projects.schema';


@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) {}

    async findAll(): Promise<Project[]> {
        return this.projectModel.find().exec();
    }
}