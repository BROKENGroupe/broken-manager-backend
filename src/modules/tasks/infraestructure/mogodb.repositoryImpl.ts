import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";
import {HttpException, Injectable } from "@nestjs/common";
import { HttpErrors, HttpSuccess } from "@common/handler/http/http-errors-constants";
import { successResponseDto } from "@common/handler/http";
import { TaskRepository, TaskEntity } from "@tasks/domain";
import { CreateTaskDto } from "@tasks/presentation";
import { Task } from "./database";

@Injectable()
export class MongoDBRespositoryImpl extends TaskRepository {

    constructor(@InjectModel(Task.name)
    private readonly TaskModel: Model<Task>) {
        super();
    }

    async findAll(): Promise<TaskEntity[]> {
        const result = await this.TaskModel.find().exec()
        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result
    }

    async findById(id: string): Promise<TaskEntity | []> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const taskId = new Types.ObjectId(id);

        const task = await this.TaskModel.findById(taskId);
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.TaskModel.findById(id)
        return result ?? []
    }

    async save(task: CreateTaskDto): Promise<TaskEntity> {
        const newtask = new this.TaskModel(task)
        return await newtask.save()
    }

    async update(id: string, taskDto: CreateTaskDto): Promise<TaskEntity | null> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const taskId = new Types.ObjectId(id);

        const task = await this.TaskModel.findById(taskId);
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.TaskModel.findByIdAndUpdate(id, taskDto, {
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

        const task = await this.TaskModel.findById(taskId);
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.TaskModel.findByIdAndDelete(id)

        if (!result) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const respo:successResponseDto  = {
            success: true,
            message: HttpSuccess.DELETE.message,
            statusCode: 201,
            timestamp: new Date().toISOString(),
            path: `/task/delete/${id}`,
        }

        return respo
    }

}