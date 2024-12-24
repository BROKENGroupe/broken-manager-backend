import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "./schemas/projects.schema";
import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../../presentation/http-dtos/project-create-http-dto";

@Injectable()
export class MongoDBRespositoryImpl extends ProjectRepository {

    constructor(@InjectModel(Project.name)
    private readonly projectModel: Model<Project>) {
        super();
    }

    async findAll(): Promise<ProjectEntity[]> {
        return await this.projectModel.find().exec()
    }

    async findById(id: string): Promise<ProjectEntity | []> {
        const result = await this.projectModel.findById(id)
        return result ?? []
    }

    async save(project: CreateProjectDto): Promise<ProjectEntity> {
        const newProject = new this.projectModel(project)
        return await newProject.save()
    }

    async update(id: string, project: CreateProjectDto): Promise<ProjectEntity | null> {
        const result = await this.projectModel.findByIdAndUpdate(id, project, {
            new: true,
            runValidators: true
        })
        return result ?? null
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.projectModel.findByIdAndDelete(id)
        return result !== null
    }

}