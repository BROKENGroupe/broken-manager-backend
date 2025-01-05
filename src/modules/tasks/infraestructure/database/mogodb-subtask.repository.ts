import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";
import { HttpException, Injectable } from "@nestjs/common";
import { SubTaskEntity } from "@tasks/domain";
import { CreateTaskDto, UpdateTaskDto } from "@tasks/presentation";
import { HttpErrors, HttpSuccess, successResponseDto } from "@common/handlers";
import { SubTask } from "./schemas";
import { SubTaskRepository } from "@tasks/domain/repositories/subtask.repository";

@Injectable()
export class MongoDBSubTaskRespositoryImpl extends SubTaskRepository {

    constructor(@InjectModel(SubTask.name)
    private readonly subTaskModel: Model<SubTask>) {
        super();
    }

    async findAll(): Promise<SubTaskEntity[]> {
        const result = await this.subTaskModel.find().exec()

        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result ?? []
    }

    async findById(id: string): Promise<SubTaskEntity | []> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const taskId = new Types.ObjectId(id);

        const task = await this.subTaskModel.findById(taskId);
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.subTaskModel.findById(id)
        return result ?? []
    }

    async findAllById(id: string): Promise<SubTaskEntity[] | []> {
        const result = await this.subTaskModel.find({
            taskId: { $in: [id] }
        }).exec();

        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result
    }

    async save(task: CreateTaskDto): Promise<SubTaskEntity> {
        const newtask = new this.subTaskModel(task)
        return await newtask.save()
    }

    async update(id: string, taskDto: UpdateTaskDto): Promise<SubTaskEntity | null> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const taskId = new Types.ObjectId(id);

        const task = await this.subTaskModel.findById(taskId);
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.subTaskModel.findByIdAndUpdate(id,
            {
                $addToSet: { assign: taskDto.assign }
            },
            {
                new: true,
                runValidators: true
            })
        return result ?? null
    }

    async delete(id: string): Promise<successResponseDto> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const taskId = new Types.ObjectId(id);

        const task = await this.subTaskModel.findById(taskId);
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.subTaskModel.findByIdAndDelete(id)

        if (!result) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const respo: successResponseDto = {
            success: true,
            message: HttpSuccess.DELETE.message,
            statusCode: 201,
            timestamp: new Date().toISOString(),
            path: `/subtask/delete/${id}`,
        }

        return respo
    }

}