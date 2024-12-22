import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "./schemas/projects.schema";
import { Injectable } from "@nestjs/common";
import { CreateProjectDTO } from "../../presentation/http-dtos/project-create-http-dto";

@Injectable()
export class MongoDBRespositoryImpl extends ProjectRepository {

    constructor(@InjectModel(Project.name) private readonly projectModel: Model<Project>) {
        super();
    }

    findById(id: string): ProjectEntity {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<ProjectEntity[]> {
        return this.projectModel.find().exec()
    }

    save(project: CreateProjectDTO): ProjectEntity {
        const newProject = new this.projectModel(project)
        newProject.save()
        return newProject
    }

    update(project: CreateProjectDTO) {

    }

    getAll() {
        const res = this.projectModel.find()
        return res
    }

}