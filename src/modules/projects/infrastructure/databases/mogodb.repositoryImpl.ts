import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { ProjectCreateHttpDto } from "../../presentation/http-dtos/project-create-http-dto";
import { Project } from "./schemas/projects.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MongoDBRespositoryImpl extends ProjectRepository {

    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    ) {
        super();
        this.getAll()
    }

    save(project: ProjectCreateHttpDto): ProjectEntity {
        throw new Error("Method not implemented.");
    }

    update(project: ProjectCreateHttpDto) {

    }

    getAll() {
        const res = this.projectModel.find()
        console.log(res)
        return res
    }

    findById(id: string): ProjectEntity {

        const nw: ProjectEntity = {
            id: '123',
            name: 'ddf',
            description: "fdf",
            status: "infdf",
            createdAt: new Date(),
            updatedAt: new Date
        }

        const project = new ProjectEntity(nw)

        return project
    }

}