import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";
import {HttpException, Injectable } from "@nestjs/common";
import { HttpErrors, HttpSuccess } from "@common/handler/http/http-errors-constants";
import { successResponseDto } from "@common/handler/http";
import { Board } from "./schemas";
import { BoardEntity } from "@boards/domain";
import { CreateBoardDto } from "@boards/presentation";
import { BoardRepository } from "@boards/domain/repositories";

@Injectable()
export class MongoDBRespositoryImpl extends BoardRepository {

    constructor(@InjectModel(Board.name)
    private readonly boardModel: Model<Board>) {
        super();
    }

    async findAll(): Promise<BoardEntity[]> {
        const result = await this.boardModel.find().exec()
        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result
    }

    async findById(id: string): Promise<BoardEntity | []> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.boardModel.findById(projectId);
        if (!project) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.boardModel.findById(id)
        return result ?? []
    }

    async save(project: CreateBoardDto): Promise<BoardEntity> {
        const newProject = new this.boardModel(project)
        return await newProject.save()
    }

    async update(id: string, projectDto: CreateBoardDto): Promise<BoardEntity | null> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.boardModel.findById(projectId);
        if (!project) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.boardModel.findByIdAndUpdate(id, projectDto, {
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

        const project = await this.boardModel.findById(projectId);
        if (!project) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.boardModel.findByIdAndDelete(id)

        if (!result) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const respo:successResponseDto  = {
            success: true,
            message: HttpSuccess.DELETE.message,
            statusCode: 201,
            timestamp: new Date().toISOString(),
            path: `/board/delete/${id}`,
        }

        return respo
    }

}