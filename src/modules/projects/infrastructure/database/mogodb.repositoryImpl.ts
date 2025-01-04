import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { Project } from "./schemas/projects.schema";
import { HttpException, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../../presentation/http-dtos/project-create-http-dto";
import { HttpErrors, HttpSuccess } from "@common/handler/http/http-errors-constants";
import { successResponseDto } from "@common/handler/http/http-response.dto";

@Injectable()
export class MongoDBRespositoryImpl extends ProjectRepository {

    constructor(@InjectModel(Project.name)
    private readonly projectModel: Model<Project>) {
        super();
    }

    async findAll(): Promise<ProjectEntity[]> {
        const result = await this.projectModel.find().exec()
        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result
    }

    async findById(id: string): Promise<ProjectEntity | []> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
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
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.projectModel.findByIdAndUpdate(id, projectDto, {
            new: true,
            runValidators: true
        })
        return result ?? null
    }

    async delete(id: string): Promise<successResponseDto> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.projectModel.findById(projectId);
        if (!project) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.projectModel.findByIdAndDelete(id)

        if (!result) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const respo: successResponseDto = {
            success: true,
            message: HttpSuccess.DELETE.message,
            statusCode: 201,
            timestamp: new Date().toISOString(),
            path: `/projects/delete/${id}`,
        }

        return respo
    }

}