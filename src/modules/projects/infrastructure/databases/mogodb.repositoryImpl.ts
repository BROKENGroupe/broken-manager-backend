import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "./schemas/projects.schema";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

        if (!isValidObjectId(id)) {
            throw new BadRequestException(`El ID proporcionado (${id}) no es válido.`);
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new NotFoundException(`No se encontró un registro con ID ${projectId}.`);
        }

        const result = await this.projectModel.findById(id)
        return result ?? []
    }

    async save(project: CreateProjectDto): Promise<ProjectEntity> {
        const newProject = new this.projectModel(project)
        return await newProject.save()
    }

    async update(id: string, projectDto: CreateProjectDto): Promise<ProjectEntity | null> {

        if (!isValidObjectId(id)) {
            throw new BadRequestException(`El ID proporcionado (${id}) no es válido.`);
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new NotFoundException(`No se encontró un registro con ID ${projectId}.`);
        }

        const result = await this.projectModel.findByIdAndUpdate(id, projectDto, {
            new: true,
            runValidators: true
        })
        return result ?? null
    }

    async delete(id: string): Promise<boolean> {

        if (!isValidObjectId(id)) {
            throw new BadRequestException(`El ID proporcionado (${id}) no es válido.`);
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new NotFoundException(`No se encontró un registro con ID ${projectId}.`);
        }

        const result = await this.projectModel.findByIdAndDelete(id)
        return result !== null
    }

}