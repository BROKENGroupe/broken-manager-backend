import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "./schemas/projects.schema";
import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../../presentation/http-dtos/project-create-http-dto";

@Injectable()
export class MongoDBRespositoryImpl extends ProjectRepository {

    async findAll() {
        return await this.projectModel.find().exec()
    }

    constructor(@InjectModel(Project.name) private readonly projectModel: Model<Project>) {
        super();
    }

    findById(id: string): Promise<ProjectEntity> {
        throw new Error("Method not implemented.");
    }

    save(project: CreateProjectDto) {
        const newProject = new this.projectModel(project)
        newProject.save()
        return newProject
    }

    update(project: CreateProjectDto) {
        throw new Error("Method not implemented.");

    }

    getAll() {
        const res = this.projectModel.find()
        return res
    }

}